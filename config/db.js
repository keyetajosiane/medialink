const util = require('util');
const { connection } = require("./connection");

console.log("Starting database initialization");

// Promisify the connection methods
// Promisify the 'connect' method of the 'connection' object
connection.connect = util.promisify(connection.connect);

// Promisify the 'query' method of the 'connection' object
connection.query = util.promisify(connection.query);

// Promisify the 'end' method of the 'connection' object
connection.end = util.promisify(connection.end);

// Define an asynchronous function called createTable that takes in two parameters: query and tableName
async function createTable(query, tableName) {
  try {
    // Await the execution of the query using the connection object
    await connection.query(query);

    // Log a success message indicating that the table has been created
    console.log(`Table ${tableName} created`);
  } catch (err) {
    // Log an error message if there's an error creating the table
    console.error(`Error creating table ${tableName}:`, err);
  }
}

async function columnExists(tableName, columnName) {
  try {
    const query = `
      SELECT COUNT(*) AS count
      FROM information_schema.columns
      WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?;
    `;
    const [rows] = await connection.query(query, [tableName, columnName]);
    
    // Check if rows is not undefined and has at least one result
    if (rows && rows.length > 0) {
      return rows[0]['count'] > 0;
    } else {
      // Log for debugging
      console.error('Unexpected result structure:', rows);
      return false;
    }
  } catch (err) {
    // Log an error message if there's an error executing the query
    console.error('Error checking column existence:', err);
    throw err; // Rethrow the error to handle it further up the call stack
  }
}

async function alterTable(sql, tableName) {
  try {
    await connection.query(sql);
    console.log(`Table ${tableName} altered successfully.`);
  } catch (err) {
    console.error(`Error altering table ${tableName}:`, err);
  }
}

async function ensureColumn(tableName, columnName, columnDefinition) {
  const exists = await columnExists(tableName, columnName);
  if (!exists) {
    const alterTableSql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefinition};`;
    await alterTable(alterTableSql, tableName);
  } else {
    console.log(`Column ${columnName} already exists in ${tableName}.`);
  }
}

// Function to alter a table, only if the column does not exist
async function alterTableWithCheck(sql, tableName, columnName) {
  const exists = await columnExists(tableName, columnName);
  if (!exists) {
    await alterTable(sql, tableName);
  } else {
    console.log(`Column ${columnName} already exists in ${tableName}, skipping alteration.`);
  }
}

async function initializeDatabase() {
  try {
    await connection.connect();
    console.log('Connected!');

    // User table
    var userTableSql = "CREATE TABLE IF NOT EXISTS  user(user_id INT PRIMARY KEY AUTO_INCREMENT,  user_name varchar(255), first_name varchar(255), last_name varchar(255), email varchar(255) unique , password varchar(255), is_admin BOOLEAN, role varchar(255))";
    await createTable(userTableSql, 'user');

    // Ressources table
    var ressourcesTableSql = "CREATE TABLE IF NOT EXISTS ressources(ressources_id INT PRIMARY KEY AUTO_INCREMENT,title varchar(255), url text, description text, user_id int NOT NULL , foreign key (user_id) references user(user_id))";
    await createTable(ressourcesTableSql, 'ressources');

    // Departement table
    var departementTableSql = "CREATE TABLE IF NOT EXISTS departement(departement_id INT PRIMARY KEY AUTO_INCREMENT, nom_departement varchar(255) UNIQUE)";
    await createTable(departementTableSql, 'departement');

    // Apprenant table
    var apprenantTableSql = `CREATE TABLE IF NOT EXISTS apprenant(
      apprenant_id INT PRIMARY KEY AUTO_INCREMENT,
      matricule varchar(255) not null unique,
      user_id INT NOT NULL UNIQUE, 
      departement_id INT NOT NULL ,
      foreign key (user_id) references user(user_id),
      foreign key (departement_id) references departement(departement_id)
    )`;
    await createTable(apprenantTableSql, 'apprenant');

    // Permissions table
    var permissionsTableSql = "CREATE TABLE IF NOT EXISTS permissions (permissions_id INT PRIMARY KEY AUTO_INCREMENT, nom varchar(255) unique)";
    await createTable(permissionsTableSql, 'permissions');

    // User permissions table
    var userPermissionsTableSql = `CREATE TABLE IF NOT EXISTS user_permissions (
      user_id INT NOT NULL,
      permissions_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(user_id),
      FOREIGN KEY (permissions_id) REFERENCES permissions(permissions_id)
    )`;
    await createTable(userPermissionsTableSql, 'user_permissions');

    // Administrations members table
    var administrationsMembersTableSql = `CREATE TABLE IF NOT EXISTS administrations_members (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL UNIQUE,
      poste VARCHAR(255),
      FOREIGN KEY (user_id) REFERENCES user(user_id)
    )`;
    await createTable(administrationsMembersTableSql, 'administrations_members');

    // Formateurs table
    var formateursTableSql = `CREATE TABLE IF NOT EXISTS formateur (
      formateur_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL UNIQUE,
      FOREIGN KEY (user_id) REFERENCES user(user_id)
    )`;
    await createTable(formateursTableSql, 'formateurs');

    // Departements Formateurs table
    var departementsFormateursTableSql = `CREATE TABLE IF NOT EXISTS departement_formateur (
      id INT PRIMARY KEY AUTO_INCREMENT,
      formateur_id INT NOT NULL,
      departement_id INT NOT NULL,
      FOREIGN KEY (formateur_id) REFERENCES formateur(formateur_id),
      FOREIGN KEY (departement_id) REFERENCES departement(departement_id)
    )`;
    await createTable(departementsFormateursTableSql, 'departements_formateurs');

    // Modules table
    var modulesTableSql = `CREATE TABLE IF NOT EXISTS modules (
    module_id INT PRIMARY KEY AUTO_INCREMENT,
    module_name VARCHAR(255),
    description TEXT,
    departement_id INT NOT NULL,
    FOREIGN KEY (departement_id) REFERENCES departement(departement_id)
  )`;
    await createTable(modulesTableSql, 'modules');

    // Formateurs Modules junction table with academic year
    var formateursModulesTableSql = `CREATE TABLE IF NOT EXISTS formateur_modules (
      formateur_id INT NOT NULL,
      module_id INT NOT NULL,
      academic_year VARCHAR(255) NOT NULL,
      FOREIGN KEY (formateur_id) REFERENCES formateur(formateur_id),
      FOREIGN KEY (module_id) REFERENCES modules(module_id),
      PRIMARY KEY (formateur_id, module_id, academic_year) -- Composite primary key now includes academic_year
    )`;
    await createTable(formateursModulesTableSql, 'formateur_modules');

    // Apprenant Modules junction table with academic year
    var apprenantModulesTableSql = `CREATE TABLE IF NOT EXISTS apprenant_modules (
      apprenant_id INT NOT NULL,
      module_id INT NOT NULL,
      academic_year VARCHAR(255) NOT NULL,
      FOREIGN KEY (apprenant_id) REFERENCES apprenant(apprenant_id),
      FOREIGN KEY (module_id) REFERENCES modules(module_id),
      PRIMARY KEY (apprenant_id, module_id, academic_year) -- Composite primary key now includes academic_year
    )`;
    await createTable(apprenantModulesTableSql, 'apprenant_modules');

    // Metadata fields
    const metadataFieldsSql = `
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ADD COLUMN created_by INT,
    ADD CONSTRAINT fk_{tableName}_created_by FOREIGN KEY (created_by) REFERENCES user(user_id)
  `;

    // Tables to be updated with metadata fields
    const tablesWithMetadata = ['departement', 'apprenant', 'permissions', 'administrations_members', 'formateur', 'modules'];

    // Add metadata fields to each table, checking if they exist first
    for (const tableName of tablesWithMetadata) {
      await ensureColumn(tableName, 'created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
      await ensureColumn(tableName, 'updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
      await ensureColumn(tableName, 'created_by', 'INT');
      await alterTableWithCheck(`
      ALTER TABLE ${tableName}
      ADD CONSTRAINT fk_${tableName}_created_by FOREIGN KEY (created_by) REFERENCES user(user_id)
    `, tableName, 'created_by');
    }

    await connection.end();
    console.log('Connection ended');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

initializeDatabase();
