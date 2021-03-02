const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../DB/db');
const utils = require('../utils');
const con = mysql.createConnection(dbConfig);

const ITEM_NOT_FOUND_MSG = "Item not found.";
const UPDATED_MSG = "Item data was updated.";
const DELETED_MSG = "Item was deleted from the database.";
const ITEM_ADDED_MSG = "Item was added to the database."

router.route("/")
    .post(async (req, res) => {
        const verified = await utils.verifyToken(req);
        if (!verified) {
            return res.status(401).send({ message: 'Invalid token or you need to login again.' });
        };

        const result = await utils.addItem(req.body);
        if (result.msg == ITEM_ADDED_MSG) {
            const id = result.id;
            const itemInfo = await findById(id);

            itemInfo.id = `http://localhost:8080/api/items/${id}`;
            res.status(201).send({ "message": itemInfo });
        }
        else {
            console.log('error: ', error)
            res.status(400).send({ "message": error });
        }
    });


router.route("/query")
    .get(async (req, res) => {
        const limit = parseInt(req.query.limit) || 1000;
        const offset = parseInt(req.query.offset) || 0;

        const verified = await utils.verifyToken(req);
        if (!verified) {
            return res.status(401).send({ message: 'Invalid token or you need to login again.' });

        };
        const itemInfo = await utils.getItems(limit, offset);
        let totalCount;
        if (offset == 0) {
            totalCount = await utils.getNumOfAllItems();
        }

        if (typeof totalCount == "number") {
            res.status(200).send({
                "message": itemInfo,
                "totalCount": totalCount
            });
        } else {
            res.status(200).send({ "message": itemInfo });
        };
    });


router.route("/:id")
    .get(async (req, res) => {
        if (!utils.verifyToken(req)) {
            return res.status(401).send({ message: 'Invalid token or You need to login again.' });
        }
        const { id } = req.params;
        const itemInfo = await findById(id);
        res.status(200).send({ "message": itemInfo });
    })
    .put(async (req, res) => {
        if (!utils.verifyToken(req)) {
            return res.status(401).send({ message: 'Invalid token or You need to login again.' });
        }
        const { id } = req.params;
        const itemInfo = await findById(id);

        if (itemInfo == ITEM_NOT_FOUND_MSG) {
            res.status(404).send({ "message": itemInfo });
        } else {
            const itemInfo = req.body;
            const updatedItem = await utils.updateItemData(id, itemInfo);

            if (updatedItem != undefined) {
                res.status(201).send({ "message": UPDATED_MSG });
            }
        }
    })
    .delete(async (req, res) => {
        if (!utils.verifyToken(req)) {
            return res.status(401).send({ message: 'Invalid token or You need to login again.' });
        }
        const { id } = req.params;
        const itemInfo = await findById(id);

        if (itemInfo == ITEM_NOT_FOUND_MSG) {
            res.status(400).send({ "message": itemInfo });
        } else {
            const deletedItem = await utils.deleteItem(id);
            if (deletedItem != undefined) {
                res.status(200).send({ "message": DELETED_MSG });
            }
        };
    });




function findById(id) {
    const sql = `SELECT * FROM food_tracker.items WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            if (rows[0] == undefined) {
                return resolve(ITEM_NOT_FOUND_MSG);
            }
            return resolve(rows[0]);
        });
    });
};





module.exports = router;