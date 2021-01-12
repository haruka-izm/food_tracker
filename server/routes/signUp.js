const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const dbConfig = require('../DB/db');
const utils = require('../utils');


const con = mysql.createConnection(dbConfig);

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (email.length == 0 || password.length == 0) {
        return res.status(400).send({ message: "Please provide required information." });
    }

    const creation = await createNewUser(email, password);
    if (creation == 'CREATED') {
        const token = await utils.generateToken(email);
        if (token == null) {
            return res.status(400).send({ message: "authentication failed." });
        }
        res.cookie('token', token, {
            expires: new Date(Date.now() + 60 * 60 * 24 * 30),  // 30 days
            secure: false,
            httpOnly: true,
        });

        return res.status(201).send({ message: `a new user: ${email} is created.` });
    }

    if (creation == 'FAILED') {
        return res.status(400).send({ message: `The user: ${email} already exists.` });
    }
});



createNewUser = async (email, password) => {
    const result = await findByEmail(email);

    if (result == "FOUND") {
        return 'FAILED';
    }

    const encryptedPW = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO food_tracker.users (email, password) VALUES ("${email}", "${encryptedPW}")`;

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
    const sql = `SELECT * FROM food_tracker.users WHERE email="${email}"`;

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