const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bycrypt = require('bcrypt');
const dbConfig = require('../DB/db');


const con = mysql.createConnection(dbConfig);

router.route("/items/:id")
    .get((req, res) => {
        res.json("get route")

    })
    .put((req, res) => {
        res.json("put route")
    })
    .delete((req, res) => {
        res.json("delete route")
    })



module.exports = router;