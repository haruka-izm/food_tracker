const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bycrypt = require('bcrypt');
const dbConfig = require('../DB/db');
const { resolve } = require('path');


const con = mysql.createConnection(dbConfig);

router.route("/items/:id")
    .get(async (req, res) => {
        const { id } = req.params;
        const itemInfo = await findById(id)

        res.status(200).send({ "item": itemInfo });

    })
    .put((req, res) => {
        res.json("put route")
    })
    .delete((req, res) => {
        res.json("delete route")
    })


function findById(id) {
    const sql = `SELECT * FROM food_tracker.items WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            return resolve(row[0]);
        });
    });
};


module.exports = router;