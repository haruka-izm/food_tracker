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
        console.log('post called')
        console.log('req.body', req.body)
        const result = await addItem(req.body);
        if (result.msg == ITEM_ADDED_MSG) {
            const id = result.id;
            const itemInfo = await findById(id);

            itemInfo.id = `http://localhost:8080/api/items/${id}`;
            res.status(201).send({ "message": itemInfo });
        }
        else {
            // to do: confirm status code
            console.log("DB error")
            console.log('error: ', error)
            res.status(400).send({ "message": error });
        }

    })

// need to be declaired before /:id
router.route("/query")
    .get(async (req, res) => {
        console.log("query called")
        const limit = parseInt(req.query.limit) || 1000;
        const offset = parseInt(req.query.offset) || 0;


        // disabled: for test purpose
        //utils.verifyToken(req, res);
        const itemInfo = await getItems(limit, offset);
        let totalCount;
        if (offset == 0) {
            totalCount = await getNumOfAllItems();
        }

        if (typeof totalCount == "number") {
            res.status(200).send({
                "message": itemInfo,
                "totalCount": totalCount
            });
        } else {
            res.status(200).send({ "message": itemInfo });
        }

    })


router.route("/:id")
    .get(async (req, res) => {
        //utils.verifyToken(req, res);
        const { id } = req.params;
        const itemInfo = await findById(id);
        res.status(200).send({ "message": itemInfo });
    })
    .put(async (req, res) => {
        //utils.verifyToken(req, res);
        const { id } = req.params;
        const itemInfo = await findById(id);

        if (itemInfo == ITEM_NOT_FOUND_MSG) {
            // to do: confirm status code
            res.status(400).send({ "message": itemInfo });
        } else {
            const itemInfo = req.body;
            const updatedItem = await updateItemData(id, itemInfo);

            if (updatedItem != undefined) {
                res.status(201).send({ "message": UPDATED_MSG });
            }
        }
    })
    .delete(async (req, res) => {
        //utils.verifyToken(req, res);
        const { id } = req.params;
        const itemInfo = await findById(id);

        if (itemInfo == ITEM_NOT_FOUND_MSG) {
            res.status(400).send({ "message": itemInfo });
        } else {
            const deletedItem = await deleteItem(id);
            if (deletedItem != undefined) {
                res.status(200).send({ "message": DELETED_MSG });
            }
        };
    });


function addItem(newItem) {
    const { name, quantity, purchased_date, expiry_date, category } = newItem;
    const num = parseInt(quantity);
    const sql = `INSERT INTO food_tracker.items (name, quantity, purchased_date, expiry_date, category) VALUES ('${name}', ${num}, '${purchased_date}', '${expiry_date}', '${category}')`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            return resolve({ 'msg': ITEM_ADDED_MSG, 'id': row.insertId });
        });
    });
};



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


function updateItemData(id, itemInfo) {
    const { name, quantity, purchased_date, expiry_date, category } = itemInfo;
    const num = parseInt(quantity);
    const sql = `UPDATE food_tracker.items SET name="${name}", quantity=${num}, purchased_date="${purchased_date}", expiry_date="${expiry_date}", category="${category}" WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            return resolve(UPDATED_MSG);
        });
    });
};


function deleteItem(id) {
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



function getItems(limit, offset) {
    const sql = `SELECT * FROM food_tracker.items LIMIT ${limit} OFFSET ${offset}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            if (rows[0] == undefined) {
                return resolve(ITEM_NOT_FOUND_MSG);
            }

            rows.forEach(row => {
                row.id = `http://localhost:8080/api/items/${row.id}`;
            });

            return resolve(rows);
        });
    });
};

function getNumOfAllItems() {
    const sql = "SELECT COUNT(*) as TotalCount from food_tracker.items";

    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            if (rows[0] == undefined) {
                return resolve(ITEM_NOT_FOUND_MSG);
            }

            const numberOfRows = rows[0].TotalCount;
            return resolve(numberOfRows);
        });
    });
};



module.exports = router;