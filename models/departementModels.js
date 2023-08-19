const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mediateque'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  })
  // Define the user model class
class departement {

   
    static async insert(departement) {
        const conn = await pool.getConnection();
        await conn.query(
            `
      INSERT INTO departement  (nom_departement)
      VALUES (?)
      `,
            [departement.nom_departement]
        );
        conn.release();
    }

 // all about find :SELECTE
    static async findByDepartement_id(departement_id) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM departement WHERE departement_id = ?', [departement_id]);
        conn.release();
        return result[0] || null;
    }
    static async findByNom_departement(nom_departement) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM departement WHERE departement_id = ?', [nom_departement]);
        conn.release();
        return result[0] || null;
    }


 //all about update=mettre a jour   
    static async updateNom_departement(nom_departement) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE departement SET nom_departement = ? WHERE departement_id = ?', [nom_departement, departement_id]);
        conn.release();
        return result.affectedRows || null;
    }
     // update all fields of a departement object
     static async updateDepartement(departement_id, departement) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE departement SET ? WHERE id = ?', [departement, departement_id]);
        conn.release();
        return result.affectedRows || null;
    }


 //all about DELETE 
    static async delete(departement_id) {//suprimer tt les departements
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM departement WHERE departement_id = ?', [departement_id]);
        conn.release();
        return result.affectedRows || null;
    }
    // delete a departement by their name
    static async deleteByNom_departement(nom_departement) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM departement WHERE nom_departement = ?', [nom_departement]);
        conn.release();
        return result.affectedRows || null;
    }
    // retrieve all departement from the users table
    static async findAll() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM departement');
        conn.release();
        return result || null;
    }   
// return the total number of users in the users table
    static async count() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT COUNT(*) FROM departement');
        conn.release();
        return result[0] || null;
    }
}

// Export the user model
module.exports = departement;
