const {createConnection} = require('../config/connection');

class UserPermissionsModel {
    static async insert(user_permission_data){
        try {
            const conn = await createConnection();
            const [res] = await conn.query(
                `
                INSERT INTO user_permissions (user_id, permissions_id)
                VALUES (?, ?)
                `,
                [user_permission_data.user_id, user_permission_data.permission_id]
            );
            conn.end();
            return res.insertId;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async userPermissionsDetails(user_id){
        const conn = await createConnection();
        const query = `
            SELECT up.user_id, p.permissions_id, p.nom 
            FROM user_permissions up, permissions p 
            WHERE up.permissions_id = p.permissions_id AND up.user_id = ?
        `;
        const [result] = await conn.query(query, [user_id]);
        conn.end();
        return result || null;
    }

    static async findByUser_id(user_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM user_permissions WHERE user_id = ?', [user_id]);
        conn.end();
        return result || null;
    }

    static async findByUser_idAndPermission_id(user_id, permission_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM user_permissions WHERE user_id = ? AND permissions_id = ?', [user_id, permission_id]);
        conn.end();
        return result[0] || null;
    }

    static async findUserPermissionsIds(user_id){
        const conn = await createConnection();
        const [result] = await conn.query('SELECT permissions_id FROM user_permissions WHERE user_id = ?', [user_id]);
        conn.end();
        if (result.length > 0) {
            return result.map(item => item.permissions_id);
        }
        return [];
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