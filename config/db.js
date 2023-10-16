const util = require('util');
const {connection} = require("./connection");

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
    var departementTableSql = "CREATE TABLE IF NOT EXISTS departement(departement_id INT PRIMARY KEY AUTO_INCREMENT, nom_departement varchar(255))";
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
      matiere_dispensee VARCHAR(255),
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

    

    await connection.end();
    console.log('Connection ended');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

initializeDatabase();
