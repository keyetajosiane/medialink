const { createConnection } = require('../config/connection');
const bcrypt = require('bcrypt');
class User {
   static async create(user) {
      try {
         const { password } = user;
    
         if (!password) {
           throw new Error('Mot de passe non valide');
         }
         // Hasher le mot de passe ici
         const hash = await bcrypt.hash(user.password, 10);
         user.password = hash;

         const conn = await createConnection();
         
         const [res] = await conn.query(
            `
          INSERT INTO user (user_name, email, password, first_name, last_name, role)
          VALUES (?, ?, ?, ?, ?, ?)`,
            [user.user_name, user.email, hash, user.first_name, user.last_name, user.role]
            
         );
         console.log(user.password);
         conn.end();
         return res.insertId;
      } catch (error) {
         console.log(error);
         return false;
      }
   }
   
// Méthode pour vérifier si le mot de passe est valide 
async isValidPassword(password) { 
   const compare = await bcrypt.compare(password, this.password); return compare;
 }



   //ALL ABOUT FIND:SELECT
   static async findByUser_id(user_id) {
      const conn = await createConnection();
      const [result] = await conn.query('SELECT * FROM user WHERE user_id = ?', [user_id]);
      conn.end();
      return result[0] || null;
   }
   static async findByUser_nameOrEmail(user_name) {
      const conn = await createConnection();
      const [result] = await conn.query('SELECT * FROM user WHERE user_name = ? OR email = ?', [user_name, user_name]);
      conn.end();
      return result[0] || null;
   }
   // Find a user by email address
   static async findByEmail(email) {
      const conn = await createConnection();
      const [result] = await conn.query('SELECT * FROM user WHERE email = ?', [email]);
      conn.end();
      return result[0] || null;
   }

   // update user
   static async updateUser(user_id,user) {
      const keys = Object.keys(user);
      let sub_str = keys.join('=?, ');
    if (!sub_str.startsWith("=?")) {
        sub_str += "=?"
    }
      let update_query = `update user set ${sub_str} where user_id = ?`;
      const values = Object.values(user);
      values.push(user_id);
      const conn = await createConnection();
      const [result] = await conn.query(update_query, values);
      conn.end();
      return result.affectedRows || null;
   }

   // ALL ABOUT UPDATE
   static async updatePassword(user_id, password) {
      const conn = await createConnection();
      const [result] = await conn.query('UPDATE user SET password = ? WHERE user_id = ?', [password, user_id]);
      conn.end();
      return result.affectedRows || null;
   }

   static async updateRole(user_id, role) {
      const conn = await createConnection();
      const [result] = await conn.query('UPDATE user SET role = ? WHERE user_id = ?', [role, user_id]);
      conn.end();
      return result.affectedRows || null;
   }

   // update a user's email address
   static async updateEmail(user_id, email) {
      const conn = await createConnection();
      const [result] = await conn.query('UPDATE user SET email = ? WHERE user_id = ?', [email, user_id]);
      conn.end();
      return result.affectedRows || null;
   }

   // update a user's user_name
   static async updateUser_name(user_id, user_name) {
      const conn = await createConnection();
      const [result] = await conn.query('UPDATE user SET user_name = ? WHERE user_id = ?', [user_name, user_id]);
      conn.end();
      return result.affectedRows || null;
   }


   // ALL ABOUT DELETE
   static async delete(user_id) {
      const conn = await createConnection();
      const [result] = await conn.query('DELETE FROM user WHERE user_id = ?', [user_id]);
      conn.end();
      return result.affectedRows || null;
   }

   // delete a user by their user_name
   static async deleteByUser_name(user_name) {
      const conn = await createConnection();
      const [result] = await conn.query('DELETE FROM users WHERE user_name = ?', [user_name]);
      conn.end();
      return result.affectedRows || null;
   }
   // retrieve all users from the users table
   static async findAll() {
      const conn = await createConnection();
      const [result] = await conn.query('SELECT * FROM user');
      conn.end();
      return result || null;
   }
   // return the total number of users in the users table
   static async count() {
      const conn = await createConnection();
      // Récupération du tableau contenant le nombre d'utilisateurs
      const [result] = await conn.query('SELECT COUNT(*) FROM user');
      conn.end();
      // Récupération de la première valeur du tableau
      const count = result[0]['COUNT(*)'];
      // Retour de la valeur ou null si elle n'existe pas
      return count;
   }
}
// Export the user model


module.exports = User;

