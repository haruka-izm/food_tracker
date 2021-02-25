// todo: delete this file?
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const dbConfig = require('../DB/db');


const con = mysql.createConnection(dbConfig);

const User = function (user) {
    this.email = user.email,
        this.password = user.password,
        this.username = user.username
}

User.createNewUser = async (newUser) => {
    console.log("called?")
    const encryptedPW = await bcrypt.hash(newUser.password, 10);
    con.connect((error) => {
        if (error) {
            throw error;
        };

        const sql = `INSERT INTO food_tracker.test (email, username, password) VALUES ("${newUser.email}", "${username}", "${encryptedPW}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;

        });
    })
}


//module.exports = User;