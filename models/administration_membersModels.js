const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mediateque'
  });

  // Define the user model class
class administration_members {

   
    static async insert(administration_members) {
        const conn = await pool.getConnection();
        await conn.query(
            `
      INSERT INTO administration_members  (poste)
      VALUES (?)
      `,
            [administration_members.poste]
        );
        conn.release();
    }

 // all about find :SELECTE
    static async findByPoste(poste) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM  administration_members   WHERE poste = ?', [poste]);
        conn.release();
        return result[0] || null;
    }
    static async findById(id) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM  administration_members   WHERE id = ?', [id]);
        conn.release();
        return result[0] || null;
    }

 //all about update=mettre a jour   
    static async updatePoste(poste) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE administration_members SET poste = ? WHERE id = ?', [poste,id]);
        conn.release();
        return result.affectedRows || null;
    }
     // update all fields of a departement object
     static async updateAdministration_members(id,administration_members) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE administration_members SET ? WHERE id = ?', [administration_members, id]);
        conn.release();
        return result.affectedRows || null;
    }


 //all about DELETE 
    static async delete(id) {//suprimer tt les administration_members
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM administration_members WHERE id = ?', [id]);
        conn.release();
        return result.affectedRows || null;
    }
    // delete a administration_members by their poste
    static async deleteByPoste(poste) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM  administration_members WHERE poste = ?', [poste]);
        conn.release();
        return result.affectedRows || null;
    }
    //delete a departement by their id
    static async deleteById(id) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM  administration_members WHERE id = ?', [id]);
        conn.release();
        return result.affectedRows || null;
    }
    // retrieve all tout les membres de l'administration from the table administration_members
    static async findAll() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM administration_members');
        conn.release();
        return result || null;
    }   
// return the total number of users in the administration_members table
    static async count() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT COUNT(*) FROM administration_members');
        conn.release();
        return result[0] || null;
    }
}

// Export the user model
module.exports = administration_members;
