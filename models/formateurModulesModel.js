const { createConnection } = require('../config/connection');

class FormateurModule {
    static async insert(formateur_id, module_id, academic_year) {
        const conn = await createConnection();
        try {
            const [res] = await conn.query(
                `INSERT INTO formateur_modules (formateur_id, module_id, academic_year) VALUES (?, ?, ?)`,
                [formateur_id, module_id, academic_year]
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
        const connection = await createConnection();
        
        try {
            await connection.beginTransaction(); // Start a transaction

            const query = 'INSERT INTO formateur_modules (formateur_id, module_id, academic_year) VALUES (?, ?, ?)';
            for (let enrollment of enrollments) {
                // Execute the individual insert queries with placeholders
                await connection.query(query, [
                    enrollment.formateur_id, 
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
            const [result] = await conn.query('SELECT * FROM formateur_modules');
            return result;
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            await conn.end();
        }
    }

    static async findByFormateur(formateur_id) {
        const conn = await createConnection();
        try {
            const [result] = await conn.query('SELECT * FROM formateur_modules WHERE formateur_id = ?', [formateur_id]);
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
            const [result] = await conn.query('SELECT * FROM formateur_modules WHERE module_id = ?', [module_id]);
            return result;
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            await conn.end();
        }
    }

    static async delete(formateur_id, module_id, academic_year) {
        const conn = await createConnection();
        try {
            const [result] = await conn.query(
                'DELETE FROM formateur_modules WHERE formateur_id = ? AND module_id = ? AND academic_year = ?',
                [formateur_id, module_id, academic_year]
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

module.exports = FormateurModule;