const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../DB/db');
const utils = require('../utils');


const con = mysql.createConnection(dbConfig);
const ITEM_NOT_FOUND_MSG = "Item not found.";
const UPDATED_MSG = "Item data was updated.";
const DELETED_MSG = "Item was deleted from the database.";

router.route("/all_items")
    .get(async (req, res) => {
        //utils.verifyToken(req, res);
        const itemInfo = await getAllItems();
        res.status(200).send({ "message": itemInfo });
    })




function getAllItems() {
    const sql = `SELECT * FROM food_tracker.items`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            if (row[0] == undefined) {
                return resolve(ITEM_NOT_FOUND_MSG);
            }
            return resolve(row);
        });
    });
};





module.exports = router;