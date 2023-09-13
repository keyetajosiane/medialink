const { validate } = require('uuid');
const { createConnection } = require('../config/connection');
// Define the user model class
class permissions {
    static async insert(permission) {
        try {
            const conn = await createConnection();
            const [res] = await conn.query(
                `
                INSERT INTO permissions (nom)
                VALUES (?)
                `,
                [permission.nom]
            );
            conn.end();
            return res.insertId;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // all about find :SELECTE
    static async findByPermissions_id(permissions_id) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM permissions WHERE permissions_id = ?', [permissions_id]);
        conn.end();
        return result[0] || null;
    }

    static async findByNom(nom) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM permissions WHERE nom = ?', [nom]);
        conn.end();
        return result[0] || null;
    }
    // update all fields of a departement object
    static async updatePermission(permissions_id, permission) {
        const keys = Object.keys(permission)
        let sub_str = keys.join('=?, ');
        if (!sub_str.startsWith("=?")) {
            sub_str += "=?"
        }
        let update_query = `update permissions set ${sub_str} where permissions_id = ?`
        const values = Object.values(permission)
        values.push(permissions_id)
        const conn = await createConnection();
        const [result] = await conn.query(update_query, values);
        conn.end();
        return result.affectedRows || null;
    }


    //all about DELETE 
    static async delete(permissions_id) {//suprimer tt les permissions
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM permissions WHERE permissions_id = ?', [permissions_id]);
        conn.end();
        return result.affectedRows || null;
    }
    // delete a departement by their name
    static async deleteByNom(nom) {
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM permissions WHERE nom = ?', [nom]);
        conn.end();
        return result.affectedRows || null;
    }
    // retrieve all departement from the users table
    static async findAll() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM permissions');
        conn.end();
        return result || null;
    }
    // return the total number of users in the permissions table
    static async count() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT COUNT(*) FROM permissions');
        conn.end();
        const count = result[0]['COUNT(*)'];
        // Retour de la valeur ou null si elle n'existe pas
        return count;
    }
}

// Export the user model
module.exports = permissions;


