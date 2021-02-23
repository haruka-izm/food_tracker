const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bycrypt = require('bcrypt');
const dbConfig = require('../DB/db');
const utils = require('../utils');


const con = mysql.createConnection(dbConfig);

router.post("/", (req, res) => {
    const { email, password } = req.body;

    if (email.length == 0 || password.length == 0) {
        return res.status(400).send({ message: "Please provide required information." });
    }

    const sql = `SELECT * FROM food_tracker.users WHERE email ="${email}"`;
    con.query(sql, async (error, result) => {
        if (error) {
            return res.status(400).send({ message: "Invalid credentials. Please try again." });
        }

        if (result.length == 0) {
            return res.status(400).send({ message: "The user doesn't exist." });
        }

        if (result.length > 0) {
            const passwordIsMatched = await bycrypt.compare(password, result[0].password);
            if (passwordIsMatched) {
                const token = await utils.generateToken(email);
                if (token == null) {
                    return res.status(400).send({ message: "authentication failed." });

                }

                const GMTcurrentTime = new Date();
                console.log("GMT current time: ", GMTcurrentTime)
                // to EDT and expires in 1 hour
                GMTcurrentTime.setHours(15);
                console.log("set exp : ", GMTcurrentTime)
                res.cookie("token", token, {
                    expires: GMTcurrentTime,
                    secure: false,
                    httpOnly: true,
                });
                return res.status(200).send({ message: "Successfully logged in" });

            } else {
                return res.status(400).send({ message: "Your login information doesn't match." });
            }
        }
    })

});


module.exports = router;