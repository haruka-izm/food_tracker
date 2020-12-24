const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bycrypt = require('bcrypt');
const dbConfig = require('../DB/db');
const jwt = require('jsonwebtoken');


const con = mysql.createConnection(dbConfig);
const ITEM_NOT_FOUND_MSG = "Item not found.";
const UPDATED_MSG = "Item data was updated.";
const DELETED_MSG = "Item was deleted from the database.";

router.route("/items/:id")
    .get(async (req, res) => {
        /*
               const token = req.cookies.token || '';
       
               if (!token) {
                   console.log("there was no token");
                   return res.status(401).json('You need to log in')
               }
               console.log('token: ', token)
               console.log("attempting to decrypt the token");
               const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
               console.log("result: ", decrypt)
       
       */



        const { id } = req.params;
        const itemInfo = await findById(id);

        res.status(200).send({ "message": itemInfo });

    })
    .put(async (req, res) => {
        const { id } = req.params;
        const itemInfo = await findById(id);

        if (itemInfo == ITEM_NOT_FOUND_MSG) {
            res.status(400).send({ "message": itemInfo });
        } else {
            const { name, quantity, purchased_date, expiry_date } = req.body;
            const updatedItem = await updateItemData(id, name, quantity, purchased_date, expiry_date);

            if (updatedItem != undefined) {
                res.status(200).send({ "message": UPDATED_MSG });
            }
        }
    })
    .delete(async (req, res) => {
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


module.exports = router;