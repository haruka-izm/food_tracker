const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../DB/db');
const utils = require('../utils');


const con = mysql.createConnection(dbConfig);
const ITEM_NOT_FOUND_MSG = "Item not found.";
const UPDATED_MSG = "Item data was updated.";
const DELETED_MSG = "Item was deleted from the database.";


// need to be declaired before /:id
router.route("/query")
    .get(async (req, res) => {
        // disabled: for test purpose
        //utils.verifyToken(req, res);
        const itemInfo = await getAllItems();
        res.status(200).send({ "message": itemInfo });
    })


router.route("/:id")
    .get(async (req, res) => {
        utils.verifyToken(req, res);
        const { id } = req.params;
        const itemInfo = await findById(id);
        res.status(200).send({ "message": itemInfo });
    })
    .put(async (req, res) => {
        //utils.verifyToken(req, res);
        const { id } = req.params;
        const itemInfo = await findById(id);

        if (itemInfo == ITEM_NOT_FOUND_MSG) {
            res.status(400).send({ "message": itemInfo });
        } else {
            const itemInfo = req.body;
            const updatedItem = await updateItemData(id, itemInfo);

            if (updatedItem != undefined) {
                res.status(200).send({ "message": UPDATED_MSG });
            }
        }
    })
    .delete(async (req, res) => {
        utils.verifyToken(req, res);
        const { id } = req.params;
        const itemInfo = await findById(id);

        if (itemInfo == ITEM_NOT_FOUND_MSG) {
            res.status(400).send({ "message": itemInfo });
        } else {
            const deletedItem = await deleteItem(id);
            if (deletedItem != undefined) {
                res.status(200).send({ "message": DELETED_MSG });
            }
        }
    })


function findById(id) {
    const sql = `SELECT * FROM food_tracker.items WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            if (row[0] == undefined) {
                return resolve(ITEM_NOT_FOUND_MSG);
            }
            return resolve(row[0]);
        });
    });
};


function updateItemData(id, itemInfo) {
    const { name, quantity, purchased_date, expiry_date, category } = itemInfo;
    const sql = `UPDATE food_tracker.items SET name="${name}", quantity=${quantity}, purchased_date="${purchased_date}", expiry_date="${expiry_date}", category="${category}" WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            return resolve(UPDATED_MSG);
        });
    });
};


const deleteItem = (id) => {
    const sql = `DELETE FROM food_tracker.items WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            return resolve(DELETED_MSG);
        });
    });
}




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