const { createConnection } = require('../config/connection');
class apprenant {
    static async insert(apprenant) {
        try{
        const conn = await createConnection();
         const [res]=  await conn.query(
            `
      INSERT INTO apprenant (matricule, user_id, departement_id, created_by)
      VALUES (?,?,?,?)
      `,
            [apprenant.matricule,apprenant.user_id,apprenant.departement_id,apprenant.created_by]
        );
        conn.end();
          return res.insertId;
       } catch (error) {
          console.log(error);
          return false;
       }
    }
     // all about find :SELECTE
    
    static async findById(apprenant_id) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM apprenant WHERE apprenant_id = ?', [apprenant_id]);
        conn.end();
        return result[0] || null;
    }

    static async findByUserId(user_id) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM apprenant WHERE user_id = ?', [user_id]);
        conn.end();
        return result[0] || null;
    }

    static async findByMatricule(matricule) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM apprenant WHERE matricule = ?', [matricule]);
        conn.end();
        return result[0] || null;
    }

 
     // update user
   static async  updateApprenant(apprenant_id, appprenant) {
    const keys = Object.keys(appprenant);
    let sub_str = keys.join('=?, ');
    if (!sub_str.startsWith("=?")) {
        sub_str += "=?"
    }
    let update_query = `update apprenant set ${sub_str} where apprenant_id =?`;
    const values = Object.values(appprenant);
    values.push(apprenant_id);
    const conn = await createConnection();
    const [result] = await conn.query(update_query, values);
    conn.end();
    return result.affectedRows || null;
 }

   

 //all about DELETE 
    static async delete(apprenant_id) {//suprimer tt lesapprenants
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM apprenant WHERE apprenant_id  = ?', [apprenant_id]);
        conn.end();
        return result.affectedRows || null;
    }
    // delete a departement by their name
    static async deleteByMatricule(matricule) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM  apprenant WHERE matricule = ?', [matricule]);
        conn.end();
        return result.affectedRows || null;
    }
   
    // retrieve all departement from the users table
    static async findAll() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM apprenant');
        conn.end();
        return result || null;
    }   
// return the total number of users in the users table
    static async count() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT COUNT(*) FROM apprenant');
        conn.end();
        const count = result[0]['COUNT(*)'];
        // Retour de la valeur ou null si elle n'existe pas
        return count;
     }
    }


// Export the user model
module.exports = apprenant;
