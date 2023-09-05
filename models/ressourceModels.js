const { createConnection } = require('../config/connection');
// importer les modules fs et path
const fs = require('fs');
const path = require('path');
// définir le chemin du dossier où stocker les fichiers
const folderPath = './opload';
// définir la classe ressource
class ressource {

  // insert a new ressource in the database
  static async insert(req, res, create_data) {
    try {
      // récupérer le fichier envoyé par le client
      const file = req.file;
      if (!file) {
        // renvoyer null
        return null;
      }
      // construire le chemin du fichier à partir du nom du fichier et du chemin du dossier
      const filePath = path.join(folderPath, file.originalname);
      // écrire le fichier dans le dossier upload
      fs.writeFileSync(filePath, file.buffer);
      // construire l'url de la ressource à partir du nom du fichier et du chemin du dossier
      const url = folderPath + '/' + file.originalname;
      // créer un objet ressources avec les données du formulaire et l'url
      const ressources = { ...req.body, url };
      // enregistrer la ressource dans la base de données
      const conn = await createConnection();
      const [result] = await conn.query(
        `
        INSERT INTO ressources (url, tittle, description,user_id)
        VALUES (?, ?, ?)
        `,
        [ressources.url, ressources.tittle, ressources.description, ressources.user_id]
      );
      conn.end();
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
    //all about a method find
    static async findByTitlle(tittle) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM ressources WHERE  tittle = ?', [tittle]);
        conn.end();
        return result[0] || null;
    }
    static async findByRessources_id(ressources_id) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM ressources WHERE  	ressources_id = ?', [ressources_id.toString()]);
        conn.end();
        return result[0] || null;
      }
      
    static async findByDescription(description) {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM  ressources WHERE  description = ?', [description]);
        conn.end();
        return result[0] || null;
    }
    //all about a method update    

    static async updateTitlle(ressources_id, tittle) {
        const conn = await createConnection();
        const result = await conn.query('UPDATE ressources SET titlle = ? WHERE ressources_id = ?', [tittle, ressources_id]);
        conn.end();
        return result.affectedRows || null;
    }
    static async updateDescription(ressources_id, description) {
        const conn = await createConnection();
        const result = await conn.query('UPDATE ressources SET description = ? WHERE ressources_id = ?', [description, ressources_id]);
        conn.end();
        return result.affectedRows || null;
    }
     // update all fields of a departement object
     static async updateRessouces (ressources_id, ressources) {
        const conn = await createConnection();
        const [result] = await conn.query('UPDATE ressources SET ? WHERE ressources_id = ?', [ressources ,ressources_id]);
        conn.end();
        return result.affectedRows || null;
    }

     static async delete(ressources_id) {
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM ressources WHERE ressources_id = ?', [ressources_id]);
        conn.end();
        return result.affectedRows || null;
     }
  
    // delete a ressources by their titlle
    static async deleteByTitlle(tittle) {
        const conn = await createConnection();
        const [result] = await conn.query('DELETE FROM resources WHERE tittle = ?', [tittle]);
        conn.end();
        return result.affectedRows || null;
    }
    static async findAll() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT * FROM ressources');
        conn.end();
        return result || null;
    }
    
    // return the total number of users in the ressources table
    static async count() {
        const conn = await createConnection();
        const [result] = await conn.query('SELECT COUNT(*) FROM ressources');
        conn.end();
        const count = result[0]['COUNT(*)'];
    // Retour de la valeur ou null si elle n'existe pas
    return count;
 }
}

// Export the user model
module.exports = ressource;






