const mysql = require("mysql");
const dbConfig = require('../DB/db');


const con = mysql.createConnection(dbConfig);


const User = function (user) {
    this.email = user.email,
        this.password = user.password
}

User.createNewUser = newUser => {
    con.connect((error) => {
        if (error) {
            throw error;
        }

        // to do: check if this user exists
        const sql = `INSERT INTO food_tracker.test (email, password) VALUES ("${newUser.email}", "${newUser.password}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;

        });

    })

}


module.exports = User;