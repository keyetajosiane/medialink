const { createConnection } = require('../config/connection');

class Modules {
    static async insert(module) {
        const conn = await createConnection();
        try {
            const [res] = await conn.query(
                `INSERT INTO modules (module_name, description, departement_id, created_by) VALUES (?, ?, ?, ?)`,
                [module.module_name, module.description, module.departement_id, module.created_by]
            );
            return res.insertId;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            await conn.end();
        }
    }

    static async findById(module_id) {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('SELECT * FROM modules WHERE module_id = ?', [module_id]);
            return result[0] || null;
        } finally {
            await conn.end();
        }
    }

    static async findByDepartementId(departement_id) {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('SELECT * FROM modules WHERE departement_id = ?', [departement_id]);
            return result || [];
        } finally {
            await conn.end();
        }
    }

    static async update(module_id, module) {
        const conn = await createConnection();
        try {
            const keys = Object.keys(module);
            const values = Object.values(module);
            let setClause = keys.map(key => `${key} = ?`).join(', ');
            values.push(module_id);
            const [result] = await conn.query(
                `UPDATE modules SET ${setClause} WHERE module_id = ?`, 
                values
            );
            return result.affectedRows || null;
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            await conn.end();
        }
    }

    static async delete(module_id) {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('DELETE FROM modules WHERE module_id = ?', [module_id]);
            return result.affectedRows || null;
        } finally {
            await conn.end();
        }
    }

    static async findAll() {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('SELECT * FROM modules');
            return result || [];
        } finally {
            await conn.end();
        }
    }

    static async count() {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('SELECT COUNT(*) AS count FROM modules');
            const count = result[0].count;
            return count;
        } finally {
            await conn.end();
        }
    }
}

module.exports = Modules;