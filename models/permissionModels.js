const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mediateque'
  });
  
  // Define the user model class
class permissions {

   
    static async insert(permission) {
        const conn = await pool.getConnection();
        await conn.query(
            `
      INSERT INTO permissions  (nom)
      VALUES (?)
      `,
            [permission.nom]
        );
        conn.release();
    }

 // all about find :SELECTE
    static async findByPermissions_id(permissions_id) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM permissions WHERE permissions_id = ?', [permissions_id]);
        conn.release();
        return result[0] || null;
    }
    static async findByNom(nom) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM permissions WHERE permissions_id = ?', [nom]);
        conn.release();
        return result[0] || null;
    }


 //all about update=mettre a jour   
    static async updateNom(nom) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE permissions SET nom = ?  WHERE permissions_id = ?', [nom, permissions_id]);
        conn.release();
        return result.affectedRows || null;
    }
     // update all fields of a departement object
     static async updatePermission(permissions_id, permissions) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE permissions SET ? WHERE permissions_id = ?', [permissions, permissions_id]);
        conn.release();
        return result.affectedRows || null;
    }


 //all about DELETE 
    static async delete(permissions_id) {//suprimer tt les permissions
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM permissions WHERE permissions_id = ?', [permissions_id]);
        conn.release();
        return result.affectedRows || null;
    }
    // delete a departement by their name
    static async deleteByNom(nom) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM permissions WHERE nom = ?', [nom]);
        conn.release();
        return result.affectedRows || null;
    }
    // retrieve all departement from the users table
    static async findAll() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM permissions');
        conn.release();
        return result || null;
    }   
// return the total number of users in the permissions table
    static async count() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT COUNT(*) FROM permissions');
        conn.release();
        return result[0] || null;
    }
}

// Export the user model
module.exports = permissions;


  