const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bycrypt = require('bcrypt');
const dbConfig = require('../DB/db');


const con = mysql.createConnection(dbConfig);

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // check if given password is equal to the stored password 
    const sql = `SELECT * FROM food_tracker.test WHERE email ="${email}"`;
    con.query(sql, async (error, result) => {
        if (error) {
            console.log(`error is: ${error}`)
            res.status(400).send("Invalid credentials. Please try again.");
        } else {
            if (result.length > 0) {
                const passwordIsMatched = await bycrypt.compare(password, result[0].password);

                if (passwordIsMatched) {
                    res.status(200).send("Successfully loged in!");
                } else {
                    res.status(400).send("Your login information doesn't match.");
                }
            } else {
                res.status(400).send("The user doesn't exists.");
            }
        }
    })

});


module.exports = router;