/*


DELETE this file




*/




const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../DB/db');
const utils = require('../utils');


const con = mysql.createConnection(dbConfig);
const ITEM_NOT_FOUND_MSG = "Item not found.";
const UPDATED_MSG = "Item data was updated.";
const DELETED_MSG = "Item was deleted from the database.";

router.route("/items/query")
    .get(async (req, res) => {
        //utils.verifyToken(req, res);
        const itemInfo = await getAllItems();
        res.status(200).send({ "message": itemInfo });
    })


function getAllItems() {
    console.log("getAllItems called")
    const sql = `SELECT * FROM food_tracker.items`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            if (rows[0] == undefined) {
                return resolve(ITEM_NOT_FOUND_MSG);
            }

            //rows.forEach;
            console.log("rows: ", rows)
            const result = rows.map(row => {
                row.id = `http://localhost:8080/api/items/${row.id}`;
            });

            return resolve(null);
        });
    });
};





module.exports = router;