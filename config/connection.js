const mysql = require('mysql2/promise');
const _mysql = require("mysql")
require('dotenv').config()

const connection = _mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  async function createConnection() {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    return connection;
  }  

module.exports = {connection, createConnection}