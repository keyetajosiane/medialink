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
});
  // Define the user model class
class apprenant {

    static async insert(apprenant) {
        const conn = await connection.getConnection();
        await conn.query(
            `
      INSERT INTO departement  (matricule)
      VALUES (?)
      `,
            [apprenant.matricule]
        );
        conn.release();
    }

 // all about find :SELECTE
    static async findById(id) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM apprenant WHERE id = ?', [id]);
        conn.release();
        return result[0] || null;
    }
    static async findByMatricule(matricule) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM apprenant WHERE id = ?', [matricule]);
        conn.release();
        return result[0] || null;
    }


 //all about update=mettre a jour   
    static async updateMatricule(matricule) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE apprenant SET matricule = ? WHERE id = ?', [matricule,id]);
        conn.release();
        return result.affectedRows || null;
    }
     // update all fields of a departement object
     static async updateApprenant(id, apprenant) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE apprenant SET ? WHERE id = ?', [apprenant, id]);
        conn.release();
        return result.affectedRows || null;
    }


 //all about DELETE 
    static async delete(id) {//suprimer tt les departements
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM apprenant WHERE id = ?', [id]);
        conn.release();
        return result.affectedRows || null;
    }
    // delete a departement by their name
    static async deleteByMatricule(matricule) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM  apprenant WHERE matricule = ?', [matricule]);
        conn.release();
        return result.affectedRows || null;
    }
    //delete a departement by their id
    static async deleteById(id) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM  apprenant WHERE id = ?', [id]);
        conn.release();
        return result.affectedRows || null;
    }
    // retrieve all departement from the users table
    static async findAll() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM apprenant');
        conn.release();
        return result || null;
    }   
// return the total number of users in the users table
    static async count() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT COUNT(*) FROM apprenant');
        conn.release();
        return result[0] || null;
    }
}

// Export the user model
module.exports = apprenant;
