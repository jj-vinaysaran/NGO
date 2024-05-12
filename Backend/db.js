const mysql = require('mysql');
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "Saran@533",
    database:"ngo"
});

module.exports = { db };
