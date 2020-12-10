const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bycrypt = require('bcrypt');
const dbConfig = require('../DB/db');


const con = mysql.createConnection(dbConfig);

router.route("/items/:id")
    .get((req, res) => {
        const { id } = req.params;
        const itemInfo = findById(id, result);

        console.log(`itemInfo: ${itemInfo}`)
        res.status(200).send("item");

    })
    .put((req, res) => {
        res.json("put route")
    })
    .delete((req, res) => {
        res.json("delete route")
    })
function findById(id, result) {
    const sql = `SELECT * FROM food_tracker.items WHERE id=${id}`;
    con.query(sql, (error, row) => {
        if (error) {
            throw 'error happened';
        }
        return result(null, row);
    });
};


module.exports = router;