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

    const user = await utils.findUserByEmail(email);
    if (!user.found) {
        return res.status(400).send({ message: "The user doesn't exist." });
    };

    if (user.found == null) {
        return res.status(400).send({ message: "Invalid credentials. Please try again." });
    };

    const passwordIsMatched = await bycrypt.compare(password, user.data[0].password);
    if (passwordIsMatched) {
        const userId = user.data[0].id;
        const token = await utils.generateToken(userId);
        if (token == null) {
            return res.status(400).send({ message: "authentication failed." });
        };

        const response = utils.setCookie(res, token)
        return response.status(200).send({ message: "Successfully logged in" });


    } else {
        return res.status(401).send({ message: "Invalid credentials. Please try again." });
    }
});


module.exports = router;