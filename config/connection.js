const mysql = require('mysql2/promise');
const _mysql = require("mysql")

const connection = _mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mediateque'
  });

  async function createConnection() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mediateque'
    });
    return connection;
  }  

module.exports = {connection, createConnection}