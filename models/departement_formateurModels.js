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
    static async findByFormateurId(formateur_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM  departement_formateur WHERE formateur_id = ?', [formateur_id]);
        conn.end();
        return result[0] || null;
    }

    static async findByDepartement_id(departement_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM departement_formateur WHERE departement_id = ?', [departement_id]);
        conn.end();
        return result[0] || null;
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