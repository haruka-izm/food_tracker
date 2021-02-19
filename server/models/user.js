
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const dbConfig = require('../DB/db');


const con = mysql.createConnection(dbConfig);

const User = function (user) {
    this.email = user.email,
        this.password = user.password
}

User.createNewUser = async (newUser) => {
    const encryptedPW = await bcrypt.hash(newUser.password, 10);
    con.connect((error) => {
        if (error) {
            throw error;
        };

        const sql = `INSERT INTO food_tracker.test (email, password) VALUES ("${newUser.email}", "${encryptedPW}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;

        });
    })
}


module.exports = User;