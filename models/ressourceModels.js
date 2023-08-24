const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mediateque'
});

class ressource {
    //insert ressouces
    static async insert(ressources) {
        const conn = await pool.getConnection();
        await conn.query(
            `
      INSERT INTO users (ressorce_name,titlle,description)
      VALUES (?, ?, ?)
      `,
            [ressources.user_name, ressources.titlle, ressources.description]
        );
        conn.release();
    }
    //all about a method find
    static async findByTitlle(titlle) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM ressources WHERE titlle = ?', [titlle]);
        conn.release();
        return result[0] || null;
    }
    static async findByRessources_id(ressouces_id) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM ressources WHERE ressouces_id = ?', [ressouces_id]);
        conn.release();
        return result[0] || null;
    }
    static async findAll() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM ressources');
        conn.release();
        return result || null;
    }
    static async findByDescription(description) {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM  ressources WHERE  description = ?', [description]);
        conn.release();
        return result[0] || null;
    }
    //all about a method update    

    static async updateTitlle(ressources_id, titlle) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE ressources SET titlle = ? WHERE ressources_id = ?', [titlle, ressources_id]);
        conn.release();
        return result.affectedRows || null;
    }
    static async updateDescription(ressources_id, description) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE ressources SET description = ? WHERE ressources_id = ?', [description, ressources_id]);
        conn.release();
        return result.affectedRows || null;
    }
    // update all fields of a ressources object
    static async updateRessouces(ressources_id, ressources) {
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE ressources SET ? WHERE ressources_id = ?', [ressources, ressources_id]);
        conn.release();
        return result.affectedRows || null;
    }

    //all about a method delete
    static async delete(ressources_id) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM ressources SET titllr=? WHERE ressources_id = ?', [ressources_id, titlle]);
        conn.release();
        return result.affectedRows || null;
    }
    // delete a ressources by their titlle
    static async deleteByTitlle(titlle) {
        const conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM resources WHERE titlle = ?', [titlle]);
        conn.release();
        return result.affectedRows || null;
    }
    
    // return the total number of users in the ressources table
    static async count() {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT COUNT(*) FROM ressources');
        conn.release();
        return result[0] || null;
    }
}
// Export the user model
module.exports = ressource;






