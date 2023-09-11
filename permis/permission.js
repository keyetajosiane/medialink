var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mediatheque'
});

connection.connect();

// Lire le contenu du fichier permissions.txt
fs.readFile('permis/permissions.txt', 'utf8', function (error, data) {
  if (error) throw error;
  // Séparer les noms des permissions par les sauts de ligne
  var permissions = data.split('\n');
  // Créer un compteur pour suivre le nombre de permissions insérées
  var counter = 0;
  // Parcourir le tableau des permissions
  for (var i = 0; i < permissions.length; i++) {
    // Insérer chaque permission dans la table permission
    connection.query('INSERT INTO permissions  (nom) VALUES (?)', [permissions[i]], function (error, results, fields) {
      if (error) throw error;
      // Récupérer l'identifiant de la permission insérée
      var id = results.insertId;
      // Faire une autre requête SQL pour obtenir le nom de la permission
      connection.query('SELECT nom FROM permissions WHERE permissions_id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        // Afficher le nom de la permission
        console.log('La permission est : ' + results[0].nom);
        // Augmenter le compteur de 1
        counter++;
        // Vérifier si le compteur est égal au nombre de permissions
        if (counter == permissions.length) {
          // Fermer la connexion
          connection.end();
        }
      });
    });
  }
});
