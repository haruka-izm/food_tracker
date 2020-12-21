const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const dbConfig = require('../DB/db');


const con = mysql.createConnection(dbConfig);

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (email.length == 0 || password.length == 0) {
        return res.status(400).send("Please provide required information.");
    }

    const creation = await createNewUser(email, password);
    if (creation == 'CREATED') {
        return res.status(201).send(`a new user: ${email} is created.`);
    }

    if (creation == 'FAILED') {
        return res.status(400).send(`The user: ${email} already exists.`);
    }
});



createNewUser = async (email, password) => {
    const result = await findByEmail(email);

    if (result == "FOUND") {
        return 'FAILED';
    }

    const encryptedPW = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO food_tracker.test (email, password) VALUES ("${email}", "${encryptedPW}")`;

    return new Promise((resolve, reject) => {
        con.query(sql, function (err, result) {
            if (err) {
                return reject(`ERROR: ${err}`);
            }
            return resolve("CREATED");
        });
    });
};

function findByEmail(email) {
    const sql = `SELECT * FROM food_tracker.test WHERE email="${email}"`;

    return new Promise((resolve, reject) => {
        con.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            if (result.length > 0) {
                resolve("FOUND");
            }
            resolve("NOT FOUND");
        });
    });
};





module.exports = router;