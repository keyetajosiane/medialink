const {createConnection} = require('../config/connection');

// define permissions for the resources model
const permissions = [
    "resource_read",
    "resource_create",
    "resource_delete",
    "resource_update",
    "user_get",
    "user_create",
    "user_update",
    "user_delete",
    "departement_get",
    "departement_create",
    "departement_delete",
    "departement_update"

]

const seedPermissions = async () => {
    try {
        // connect to the database
        const connection = await createConnection();
        // create the permissions
        console.log(`Seeding permissions...`);
        for (const permission of permissions) {
            await connection.query(`INSERT INTO permissions (nom) VALUES ('${permission}')`);
            console.log(`Inserted permission: ${permission}`);
        }
        // close the connection
        await connection.end();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {seedPermissions};
// seedPermissions();