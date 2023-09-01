const { createConnection } = require('../config/connection');
  
  // Define the user model class
class formateur{
   
    static async insert(formateur) {
        try{
        const conn = await createConnection();
       const [res]= await conn.query(
            `
      INSERT INTO formateur  (formateur_id , matiere_dispensee, user_id, )
      VALUES (?,?,?,)
      `,
            [formateur.id, formateur.matiere_dispensee, formateur.user_id]
        );
        conn.end();
        return res.insertId;
     } catch (error) {
        console.log(error);
        return false;
     }
  }

 // all about find :SELECTE
    static async findById(formateur_id) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM  formateur WHERE formateur_id = ?', [formateur_id]);
        conn.end();
        return result[0] || null;
    }
    static async findBymatiere_dispensee(matiere_dispensee) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM formateur WHERE  matiere_dispensee = ?', [matiere_dispensee]);
        conn.end();
        return result[0] || null;
    }
 //all about update=mettre a jour   
    static async updateMatiere_dispensee(matiere_dispensee) {
        const conn = await createConnectiont ();
        const [result] = await conn.query('UPDATE formateur SET matiere_dispensee = ? WHERE id = ?', [matiere_dispensee,id]);
        conn.end();
        return result.affectedRows || null;
    }
     // update all fields of a formateur object
     static async updateFormateur(id, formateur) {
        const conn = await createConnection();
        const [result] = await conn.query('UPDATE formateur SET ? WHERE id = ?', [formateur, id]);
        conn.end();
        return result.affectedRows || null;
    }


 //all about DELETE 
    static async delete(id) {//suprimer tt les departements
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM formateur WHERE id = ?', [id]);
        conn.end();
        return result.affectedRows || null;
    }
    
    //delete a departement by their id
    static async deleteById(id) {
        const conn = await createConnection();
        const result = await conn.query('DELETE FROM formateur WHERE id = ?', [id]);
        conn.end();
        return result.affectedRows || null;
    }
    // retrieve all formateur from the formateur table
    static async findAll() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM  formateur');
        conn.end();
        return result || null;
    }   
// return the total number of users in the users table
    static async count() {
        const conn = await pool.getConnection();
        const [result] = await conn.query('SELECT COUNT(*) FROM formateur');
        conn.end();
        return result[0] || null;
    }
}

// Export the user model
module.exports = formateur;
