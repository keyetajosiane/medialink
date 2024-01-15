const { createConnection } = require('../config/connection');

class departement_formateurModels {
    static async insert(departement_formateur_data) {
        try{
        const conn = await createConnection();
         const [res] = await conn.query(
            `
      INSERT INTO  departement_formateur (formateur_id,departement_id )
      VALUES (?, ?)
      `,
            [ departement_formateur_data.formateur_id, departement_formateur_data.departement_id ]
        );
        conn.end();
          return res.insertId;
       } catch (error) {
          console.log(error);
          return false;
       }
    }

    static async bulkInsert(departement_formateur_data) {
        try {
            // Assuming createConnection is a function that returns a promise for a MySQL connection
            const conn = await createConnection();
    
            // Map each data object to an array of values
            const values = departement_formateur_data.map(data => [
                data.formateur_id,
                data.departement_id
            ]);
    
            // Construct a single query to insert all rows
            const [res] = await conn.query(
                `
                INSERT INTO departement_formateur (formateur_id, departement_id)
                VALUES ?
                `,
                [values] // Use nested arrays for bulk insert with MySQL
            );
    
            conn.end();
            return res.affectedRows; // Return the number of affected rows
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async findByFormateurId(formateur_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM  departement_formateur WHERE formateur_id = ?', [formateur_id]);
        conn.end();
        return result || null;
    }

    static async findByDepartement_id(departement_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM departement_formateur WHERE departement_id = ?', [departement_id]);
        conn.end();
        return result || null;
    }

    static async findFormateurDepartementsIDs(formateur_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT departement_id FROM departement_formateur WHERE formateur_id = ?', [formateur_id]);
        conn.end();
        return result || null;
    }

    static async deleteByFormateurId(formateur_id){
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM departement_formateur WHERE formateur_id = ?', [formateur_id]);
        conn.end();
        return result.affectedRows || null;
    }

    static async deleteByDepatementId(departement_id){
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM departement_formateur WHERE departement_id = ?', [departement_id]);
        conn.end();
        return result.affectedRows || null;
    }
}

module.exports = departement_formateurModels