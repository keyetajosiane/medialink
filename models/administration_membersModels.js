const { createConnection } = require('../config/connection');

  // Define the user model class
class AdminiatrationMembers {

    static async insert(administrations_members) {
        try{
        const conn = await createConnection();
        const [res]= await conn.query(
            `
      INSERT INTO administrations_members  (poste, user_id, created_by)
      VALUES (?,?,?)
      `,
            [administrations_members.poste, administrations_members.user_id, administrations_members.created_by]
        );
        conn.end();
        conn.end();
        return res.insertId;
     } catch (error) {
        console.log(error);
        return false;
     }
  }

 // all about find :SELECTE
    static async findByPoste(poste) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM  administrations_members   WHERE poste = ?', [poste]);
        conn.end();
        return result[0] || null;
    }
    static async findById(id) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM  administrations_members   WHERE id = ?', [id]);
        conn.end();
        return result[0] || null;
    }

     // update user
   static async updateAdministration_members(id,update_data) {
    const keys = Object.keys(update_data);
    let sub_str = keys.join('=?, ');
    if (!sub_str.endsWith("=?")) {
        sub_str += '=?'
    }
    let update_query = `update administrations_members set ${sub_str} where id  = ?`;
    const values = Object.values(update_data);
    values.push(id);
    const conn = await createConnection();
    const [result] = await conn.query(update_query, values);
    conn.end();
    return result.affectedRows || null;
 }
    
 //all about DELETE 
    static async delete(id) {//suprimer tt les administration_members
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM administrations_members WHERE id = ?', [id]);
        conn.end();
        return result.affectedRows || null;
    }
    // delete a administration_members by their poste
    static async deleteByPoste(poste) {
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM  administration_members WHERE poste = ?', [poste]);
        conn.end();
        return result.affectedRows || null;
    }
    // retrieve all tout les membres de l'administration from the table administration_members
    static async findAll() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM administrations_members');
        conn.end();
        return result || null;
    }     
// return the total number of users in the administration_members table
    static async count() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT COUNT(*) FROM administrations_members');
        conn.end();
        const count = result[0]['COUNT(*)'];
        // Retour de la valeur ou null si elle n'existe pas
        return count;
    }
}

// Export the user model
module.exports = AdminiatrationMembers;
