const { createConnection } = require('../config/connection');

class ApprenantModule {
    static async insert(apprenant_id, module_id, academic_year) {
        const conn = await createConnection();
        try {
            const [res] = await conn.query(
                `INSERT INTO apprenant_modules (apprenant_id, module_id, academic_year) VALUES (?, ?, ?)`,
                [apprenant_id, module_id, academic_year]
            );
            return res.insertId;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            await conn.end();
        }
    }

    static async batchInsert(enrollments) {
        // Assuming db is your database connection module
        const connection = await db.getConnection();
        
        try {
            await connection.beginTransaction(); // Start a transaction

            const query = 'INSERT INTO apprenant_module (apprenant_id, module_id, academic_year) VALUES (?, ?, ?)';
            for (let enrollment of enrollments) {
                // Execute the individual insert queries with placeholders
                await connection.query(query, [
                    enrollment.apprenant_id, 
                    enrollment.module_id, 
                    enrollment.academic_year
                ]);
            }

            await connection.commit(); // Commit the transaction
            return enrollments; // Return the inserted enrollments
        } catch (error) {
            await connection.rollback(); // Rollback the transaction in case of error
            throw error;
        } finally {
            connection.release(); // Release the database connection
        }
    }

    static async findAll() {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('SELECT * FROM apprenant_modules');
            return result;
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            await conn.end();
        }
    }

    static async findByApprenant(apprenant_id) {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('SELECT * FROM apprenant_modules WHERE apprenant_id = ?', [apprenant_id]);
            return result;
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            await conn.end();
        }
    }

    static async findByModule(module_id) {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('SELECT * FROM apprenant_modules WHERE module_id = ?', [module_id]);
            return result;
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            await conn.end();
        }
    }

    static async findApprenantModulesIDs(apprenant_id, academic_year) {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('SELECT module_id FROM apprenant_modules WHERE apprenant_id = ? AND academic_year = ?', [apprenant_id, academic_year]);
            return result;
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            await conn.end();
        }
    }

    static async delete(apprenant_id, module_id, academic_year) {
        const conn = await createConnection();
        try {
            const [result] = await conn.query(
                'DELETE FROM apprenant_modules WHERE apprenant_id = ? AND module_id = ? AND academic_year = ?',
                [apprenant_id, module_id, academic_year]
            );
            return result.affectedRows;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            await conn.end();
        }
    }
}

module.exports = ApprenantModule;