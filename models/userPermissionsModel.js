const createConnection = require('../config/connection');

class UserPermissionsModel {
    static async insert(user_permission_data){
        try {
            const conn = await createConnection();
            const [res] = await conn.query(
                `
                INSERT INTO user_permissions (user_id, permissions_id)
                VALUES (?, ?)
                `,
                [user_permission_data.user_id, user_permission_data.permissions_id]
            );
            conn.end();
            return res.insertId;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async findByUser_id(user_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM user_permissions WHERE user_id = ?', [user_id]);
        conn.end();
        return result[0] || null;
    }

    static async findUserPermissionsIds(user_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT permissions_id FROM user_permissions WHERE user_id = ?', [user_id]);
        conn.end();
        return result || null;
    }

    static async findByPermissions_id(permissions_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM user_permissions WHERE permissions_id = ?', [permissions_id]);
        conn.end();
        return result[0] || null;
    }

    static async deleteByUserId(user_id){
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM user_permissions WHERE user_id = ?', [user_id]);
        conn.end();
        return result.affectedRows || null;
    }

    static async deleteByPermissionsId(permissions_id){
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM user_permissions WHERE permissions_id = ?', [permissions_id]);
        conn.end();
        return result.affectedRows || null;
    }
}

module.exports = UserPermissionsModel