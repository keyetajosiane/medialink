const { createConnection } = require('../config/connection');
// importer les modules fs et path
const fs = require('fs');
const path = require('path');
// définir le chemin du dossier où stocker les fichiers
const folderPath = path.join(__dirname, '../upload');

// définir la classe ressource
class ressource {

  static async insert(resourceData) {
    try {
      if (!resourceData.url) {
        // Return null
        return null;
      }
      // Save the resource to the database
      const databaseConnection = await createConnection();
      const [insertResult] = await databaseConnection.query(
        `
        INSERT INTO ressources (url, title, description,user_id)
        VALUES (?, ?, ?, ?)
        `,
        [resourceData.url, resourceData.title, resourceData.description, resourceData.user_id]
      );
      databaseConnection.end();
      return insertResult.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //all about a method find
  static async findByTitlle(title) {
    const conn = await createConnection();
    const [result] = await conn.query('SELECT * FROM ressources WHERE  title = ?', [title]);
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

  static async updateTitlle(ressources_id, title) {
    const conn = await createConnection();
    const result = await conn.query('UPDATE ressources SET titlle = ? WHERE ressources_id = ?', [title, ressources_id]);
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
  static async updateRessources(ressources_id, ressources) {
  try {
    const conn = await createConnection();
    // create the SET part
    const keys = Object.keys(ressources);
    let sub_str = keys.join('=?, ');
    if (!sub_str.startsWith("=?")) {
      sub_str += "=?"
    }
    let update_query = `update ressources set ${sub_str} where ressources_id = ?`;
    const values = Object.values(ressources);
    values.push(ressources_id);
    const [result] = await conn.query(update_query, values);
    conn.end();
    return result.affectedRows;
  } catch (error) {
    console.error('Failed to update resources:', error);
    return null;
  }
}

  static async delete(ressources_id) {
    const conn = await createConnection();
    const [result] = await conn.query('DELETE FROM ressources WHERE ressources_id = ?', [ressources_id]);
    conn.end();
    return result.affectedRows || null;
  }

  // delete a ressources by their titlle
  static async deleteByTitlle(title) {
    const conn = await createConnection();
    const [result] = await conn.query('DELETE FROM resources WHERE title = ?', [title]);
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






