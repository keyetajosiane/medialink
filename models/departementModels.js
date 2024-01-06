const { createConnection } = require('../config/connection');
  // Define the user model class
class departement {
    static async insert(departement) {
        try{
        const conn = await createConnection();
        const [res] = await conn.query(
            `
      INSERT INTO departement  (nom_departement, created_by)
      VALUES (?, ?)
      `,
            [departement.nom_departement, departement.created_by]
        );
        conn.end();
            return res.insertId;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

 // all about find :SELECTE
    static async findByDepartement_id(departement_id) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM departement WHERE departement_id = ?', [departement_id]);
        conn.end();
        return result[0] || null;
    }

    static async findByNom_departement(nom_departement) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM departement WHERE nom_departement = ?', [nom_departement]);
        conn.end();
        return result[0] || null;
    }
 //all about update=mettre a jour   
    static async updateNom_departement(nom_departement) {
        const conn = await createConnection();
        const [result] = await conn.query('UPDATE departement SET nom_departement = ? WHERE departement_id = ?', [nom_departement, departement_id]);
        conn.end();
        return result.affectedRows || null;
    }
     // update all fields of a departement object
     static async updateDepartement(departement_id, departement) {
        const conn = await createConnection();
        const [result] = await conn.query('UPDATE departement SET ? WHERE departement_id = ?', [departement, departement_id]);
        conn.end();
        return result.affectedRows || null;
    }
 //all about DELETE 
    static async delete(departement_id) {//suprimer tt les departements
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM departement WHERE departement_id = ?', [departement_id]);
        conn.end();
        return result.affectedRows || null;
    }
    // delete a departement by their name
    static async deleteByNom_departement(nom_departement) {
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM departement WHERE nom_departement = ?', [nom_departement]);
        conn.end();
        return result.affectedRows || null;
    }
    // retrieve all departement from the users table
    static async findAll() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM departement');
        conn.end();
        return result || null;
    }   
// return the total number of users in the users table
    static async count() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT COUNT(*) FROM departement');
        conn.end();
        // Récupération de la première valeur du tableau
    const count = result[0]['COUNT(*)'];
    // Retour de la valeur ou null si elle n'existe pas
        return count;
    }
}

// Export the user model
module.exports = departement;
