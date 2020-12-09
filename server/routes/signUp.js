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

    const userExists = await createNewUser(email, password);
    if (userExists) {
        return res.status(400).send(`The user: ${email} already exists.`);
    }
    return res.status(201).send(`a new user: ${email} is created.`);

});



const createNewUser = async (email, password) => {
    const found = await findByEmail(email);
    console.log(`found: ${found}`);

    if (undefined) {
        console.log("amazing");
    }

    if (findByEmail(email)) {
        console.log("user already exists")
        return true;
    }

    console.log("new user will be created")

    const encryptedPW = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO food_tracker.test (email, password) VALUES ("${email}", "${encryptedPW}")`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(`ERROR: ${err}`)
        }

    });

};

const findByEmail = async (email) => {
    //const sql = `INSERT INTO food_tracker.test (email, password) VALUES ("${email}", "${encryptedPW}")`;
    const sql = `SELECT * FROM food_tracker.test WHERE email="${email}"`;
    let state = false;
    con.query(sql, (err, result) => {
        //console.log(result.length);
        console.log(`resulting row count: ${result.length}`);
        if (result.length > 0) {
            state = true;
            return state;
        }
    });

    //console.log(`user ${email} found: ${state}`);
    return state;
};





module.exports = router;