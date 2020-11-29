const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

const User = function (user) {
    this.email = user.email,
        this.password = user.password,
        this.id = user.id
}

User.createNewUser = newUser => {
    con.connect((error) => {
        if (error) {
            throw error;
        }

        const sql = `INSERT INTO food_tracker.test (id, email, password) VALUES (${newUser.id}, "${newUser.email}", "${newUser.password}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;
        });

    })

}


module.exports = User;