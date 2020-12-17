const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bycrypt = require('bcrypt');
const dbConfig = require('../DB/db');
const { resolve } = require('path');
const e = require('express');


const con = mysql.createConnection(dbConfig);
const ERROR_MSG = "Item not found.";
const UPDATED_MSG = "Item data was updated.";

router.route("/items/:id")
    .get(async (req, res) => {
        const { id } = req.params;
        const itemInfo = await findById(id);

        res.status(200).send({ "message": itemInfo });

    })
    .put(async (req, res) => {
        const { id } = req.params;
        const itemInfo = await findById(id);

        if (itemInfo == ERROR_MSG) {
            res.status(200).send({ "message": itemInfo });
        } else {
            const { name, quantity, purchased_date, expiry_date } = req.body;
            const updatedItem = await updateItemData(id, name, quantity, purchased_date, expiry_date);

            if (updatedItem != undefined) {
                res.status(200).send({ "message": UPDATED_MSG });
            }
        }
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
            if (row[0] == undefined) {
                return resolve(ERROR_MSG);
            }
            return resolve(row[0]);
        });
    });
};


function updateItemData(id, name, quantity, purchased_date, expiry_date) {
    const sql = `UPDATE food_tracker.items SET name="${name}", quantity=${quantity}, purchased_date="${purchased_date}", expiry_date="${expiry_date}" WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            return resolve(UPDATED_MSG);
        });
    });
};


module.exports = router;