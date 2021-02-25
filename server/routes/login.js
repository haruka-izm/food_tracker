const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bycrypt = require('bcrypt');
const dbConfig = require('../DB/db');
const utils = require('../utils');


const con = mysql.createConnection(dbConfig);

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (email.length == 0 || password.length == 0) {
        return res.status(400).send({ message: "Please provide required information." });
    };

    const userInfo = await utils.findByEmail(email);
    console.log("userInfo: ", userInfo)
    if (userInfo == 'NOT FOUND') {
        return res.status(400).send({ message: "The user doesn't exist." });
    };

    if (userInfo == "ERROR") {
        return res.status(400).send({ message: "Invalid credentials. Please try again." });
    };

    const passwordIsMatched = await bycrypt.compare(password, userInfo[0].password);
    if (passwordIsMatched) {
        const userId = userInfo[0].id;
        const token = await utils.generateToken(userId);
        if (token == null) {
            return res.status(400).send({ message: "authentication failed." });

        }

        const GMTcurrentTime = new Date();
        console.log("GMT current time: ", GMTcurrentTime)
        // to EDT and expires in 1 hour
        // 16
        //GMTcurrentTime.setHours(17);
        GMTcurrentTime.setDate(GMTcurrentTime.getDate() + 2);
        console.log("set exp : ", GMTcurrentTime)
        console.log("token: ", token)
        res.cookie("token", token, {
            expires: GMTcurrentTime,
            secure: false,
            httpOnly: false
        });
        return res.status(200).send({ message: "Successfully logged in" });
    };


});


module.exports = router;