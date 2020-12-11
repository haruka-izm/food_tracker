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
    console.log(`creation: ${creation}`);
    if (creation == 'CREATED') {
        console.log("here!")
        return res.status(201).send(`a new user: ${email} is created.`);
    }

    if (creation == 'FAILED') {
        console.log('user exists')
        return res.status(400).send(`The user: ${email} already exists.`);
    }


});



createNewUser = async (email, password) => {
    const result = await findByEmail(email);

    if (result == "FOUND") {
        return 'FAILED';
    }

    console.log(" hello");
    const encryptedPW = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO food_tracker.test (email, password) VALUES ("${email}", "${encryptedPW}")`;

    return new Promise((resolve, reject) => {
        con.query(sql, function (err, result) {
            if (err) {
                return reject(`ERROR: ${err}`);
            }
            console.log("new user created")
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
                console.log("found!")
                resolve("FOUND");
            }
        });
    });
};





module.exports = router;