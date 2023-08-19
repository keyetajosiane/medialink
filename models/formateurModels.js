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
class formateur{

   
    static async insert(formateur) {
        const conn = await pool.getConnection();
        await conn.query(
            `
      INSERT INTO formateur  (id , matiere_dispensee)
      VALUES (?,?)
      `,
            [formateur.id, formateur.matiere_dispensee]
        );
        conn.release();
    }

 // all about find :SELECTE
    static async findById(id) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM  formateur WHERE id = ?', [id]);
        conn.release();
        return result[0] || null;
    }
    static async findBymatiere_dispensee(matiere_dispensee) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM formateur WHERE id = ?', [matiere_dispensee]);
        conn.release();
        return result[0] || null;
    }


 //all about update=mettre a jour   
    static async updateMatiere_dispensee(matiere_dispensee) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE formateur SET matiere_dispensee = ? WHERE id = ?', [matiere_dispensee,id]);
        conn.release();
        return result.affectedRows || null;
    }
     // update all fields of a formateur object
     static async updateFormateur(id, formateur) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE formateur SET ? WHERE id = ?', [formateur, id]);
        conn.release();
        return result.affectedRows || null;
    }


 //all about DELETE 
    static async delete(id) {//suprimer tt les departements
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM formateur WHERE id = ?', [id]);
        conn.release();
        return result.affectedRows || null;
    }
    
    //delete a departement by their id
    static async deleteById(id) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM formateur WHERE id = ?', [id]);
        conn.release();
        return result.affectedRows || null;
    }
    // retrieve all formateur from the formateur table
    static async findAll() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM  formateur');
        conn.release();
        return result || null;
    }   
// return the total number of users in the users table
    static async count() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT COUNT(*) FROM formateur');
        conn.release();
        return result[0] || null;
    }
}

// Export the user model
module.exports = formateur;
