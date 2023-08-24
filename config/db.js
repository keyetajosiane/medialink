const mysql = require('mysql');
const {connection} = require("./connection");
console.log("Starting database initialization");
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
  var sql = "CREATE TABLE IF NOT EXISTS  user(user_id INT PRIMARY KEY AUTO_INCREMENT,  user_name varchar(255), first_name varchar(255), last_name varchar(255), email varchar(255) unique , password varchar(255), is_admin BOOLEAN, role varchar(255))";
    connection.query(sql, function (err, result) {
    if (err) throw err;
     console.log("Table user créée");
  
  });


  var sql = "CREATE TABLE IF NOT EXISTS ressources(ressources_id INT PRIMARY KEY AUTO_INCREMENT,tittle varchar(255), ressouce_name text, description text, user_id int, foreign key (user_id) references user(user_id))";
   connection.query(sql, function (err, result) {
      if (err) throw err;
     console.log("Table ressources créée");
    
   });

  var sql = "CREATE TABLE IF NOT EXISTS departement(departement_id INT PRIMARY KEY AUTO_INCREMENT, nom_departement varchar(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table departement créée");
  
  });

 var sql=`create table if not exists apprenant(
    apprenant_id int auto_increment primary key,
    matricule varchar(255) not null unique,
    user_id int not null,
    departement_id int not null,
    foreign key (user_id) references user(user_id),
    foreign key (departement_id) references departement(departement_id)
  );
   `
   connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table apprenant créée");
});
  


   var sql = "CREATE TABLE IF NOT EXISTS permissions (permissions_id INT PRIMARY KEY AUTO_INCREMENT, nom varchar(255))";
   connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table permission créée");
});

 var sql=`CREATE TABLE IF NOT EXISTS user_permissions (
  user_id INT NOT NULL,
  permissions_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (permissions_id) REFERENCES permissions(permissions_id)
)`
connection.query(sql, function (err, result) {
 if (err) throw err;
 console.log("Table user permission créée");
})

var sql=`CREATE TABLE IF NOT EXISTS  administrations_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
 user_id INT NOT NULL,
 poste VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
  
)`
connection.query(sql, function (err, result) {
 if (err) throw err;
 console.log("Table administrations_members  créée");
})

var sql=`CREATE TABLE IF NOT EXISTS formateur (
  formateur_id INT PRIMARY KEY AUTO_INCREMENT,
 matiere_dispensee VARCHAR(255),
 user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
  
)`
connection.query(sql, function (err, result) {
 if (err) throw err;
 console.log("Table formateur créée");
})


var sql=`CREATE TABLE IF NOT EXISTS departement_formateur (
  id INT PRIMARY KEY AUTO_INCREMENT,
  formateur_id INT NOT NULL,
   departement_id INT NOT NULL,
  FOREIGN KEY (formateur_id) REFERENCES formateur(formateur_id),
  FOREIGN KEY ( departement_id) REFERENCES departement(departement_id)
)`
connection.query(sql, function (err, result) {
 if (err) throw err;
 console.log("Table user  departement_formateur créée");
})