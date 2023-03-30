const mysql = require("mysql");
require('dotenv').config();

let connection = mysql.createConnection({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!")
})

module.exports = connection;