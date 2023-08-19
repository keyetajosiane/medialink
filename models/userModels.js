const mysql = require('mysql2/promise');
// Créer la connexion à la base de données
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mediateque',

});
class User {
  static async create(user) {
     try {
         const conn = await pool.getConnection();
         const res = await conn.query(   `
         INSERT INTO users (user_name, email, password, first_name, last_name,role)
         VALUES (?, ?, ?, ?,?,?)`,
               [user.user_name, user.email, user.password,user.first_name, user.last_name, user.role]
         )
         conn.release();
         return res.insertId
      } catch (error) {
         return false
      }
  }
//ALL ABOUT FIND:SELECT
  static async findByUser_id(user_id) {
      const conn = await pool.getConnection();
         const result = await conn.query('SELECT * FROM user WHERE user_id = ?', [user_id]);
         conn.release();
      return result[0] || null;
   }
  static async findByUser_nameOrEmail(user_name) {
     const conn = await pool.getConnection();
         const result = await conn.query('SELECT * FROM users WHERE user_name = ? OR email = ?', [user_name, user_name]);
         conn.release();
      return result[0] || null;
   }
    // Find a user by email address
   static async findByEmail(email) {
      const conn = await pool.getConnection();
         const result = await conn.query('SELECT * FROM user WHERE email = ?', [email]);
         conn.release();
       return result[0] || null;
   }
   // update user
   static async updateUser(user){
      const keys = Object.keys(user)
      let sub_str = keys.join('=?, ')
      let update_query = `update user set ${sub_str} where user_id = ?`
      const values = Object.values(user)
      values.push(user_id)
      const conn = await pool.getConnection();
      const result = await conn.query(update_query, values)
      conn.release();
      return result.affectedRows || null;
   }
 //ALL ABOUT UPDATE 
    static async updatePassword(user_id, password) {
      const conn = await pool.getConnection();
         const result = await conn.query('UPDATE user SET password = ? WHERE user_id = ?', [password, user_id]);
         conn.release();
       return result.affectedRows || null;
    }
    static async updateRole(user_id, role) {
        const conn = await pool.getConnection();
           const result = await conn.query('UPDATE user SET role = ? WHERE user_id = ?', [role, user_id]);
           conn.release();
         return result.affectedRows || null;
      }
     // update a user's email address
    static async updateEmail(user_id, email) {
        const conn = await pool.getConnection();
         const result = await conn.query('UPDATE user SET email = ? WHERE user_id = ?', [email, user_id]);
         conn.release();
        return result.affectedRows || null;
    }
     // update a user's user_name
    static async updateUser_name(user_id, user_name) {
        const conn = await pool.getConnection();
         const result = await conn.query('UPDATE user SET user_name = ? WHERE user_id = ?', [user_name, user_id]);
         conn.release();
       return result.affectedRows || null;
   }
    // update all fields of a user object
    static async updateUser(user_id, user) {
      const conn = await pool.getConnection();
         const result = await conn.query('UPDATE user SET ? WHERE user_id = ?', [user, user_id]);
         conn.release();
       return result.affectedRows || null;
    }

//ALL ABOUT DELETE
    static async delete(user_id) {
       const conn = await pool.getConnection();
         const result = await conn.query('DELETE FROM user WHERE user_id = ?', [user_id]);
         conn.release();
      return result.affectedRows || null;
    }

    // delete a user by their user_name
    static async deleteByUser_name(user_name) {
       const conn = await pool.getConnection();
          const result = await conn.query('DELETE FROM users WHERE user_name = ?', [user_name]);
          conn.release();
      return result.affectedRows || null;
    }
  // retrieve all users from the users table
    static async findAll() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM user');
        conn.release();
       return result || null;
    }
// return the total number of users in the users table
    static async count() {
      const conn = await pool.getConnection();
      // Récupération du tableau contenant le nombre d'utilisateurs
      const result = await conn.query('SELECT COUNT(*) FROM user');
      conn.release();
      // Récupération de la première valeur du tableau
      const count = result['COUNT(*)'];
      // Retour de la valeur ou null si elle n'existe pas
      return count || null;
    }
}
// Export the user model
module.exports = User;

