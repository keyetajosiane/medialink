const mysql = require('mysql2/promise');
const _mysql = require("mysql")

const connection = _mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'mediatheque'
  });

  async function createConnection() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'admin',
      password: 'admin',
      database: 'mediatheque'
    });
    return connection;
  }  

module.exports = {connection, createConnection}