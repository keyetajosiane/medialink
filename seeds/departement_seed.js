const {createConnection} = require('../config/connection');

// define permissions for the resources model
const departement = [
"Techniques_de_Gestion_et_Management_des_Entreprises",
"Techniques_de_Secretariat_et_Assistance_de_Gestion",
"Technologies_Multimedia_et_Graphisme2D/3D",
"Techniques_Informatiques_et_Systemes_d_Information",
"Techniques_Industrielles_et_Maintenance",
"Techniques_Logistiques_Import_Export_et_Douane"
]

const seedDepartement = async () => {
    try {
        // connect to the database
        const connection = await createConnection();
        // create the permissions
        console.log(`Seeding departement...`);
        for (const departemen of departement) {
            await connection.query(`INSERT INTO departement (nom_departement) VALUES ('${departemen}')`);
            console.log(`Inserted permission: ${departemen}`);
        }
        // close the connection
        await connection.end();
    } catch (error) {
        console.log(error);
    }
}

seedDepartement();
