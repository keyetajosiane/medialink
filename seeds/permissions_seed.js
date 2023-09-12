const {createConnection} = require('../config/connection');

// define permissions for the resources model
const permissions = [
    "resource_read",
    "resource_create",
    "resource_delete",
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

seedPermissions();