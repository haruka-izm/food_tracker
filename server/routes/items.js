const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../DB/db');
const utils = require('../utils');


const ITEM_NOT_FOUND_MSG = "Item not found.";
const UPDATED_MSG = "Item data was updated.";
const DELETED_MSG = "Item was deleted from the database.";

router.route("/")
    .post(async (req, res) => {
        const verified = await utils.verifyToken(req);
        if (!verified) {
            return res.status(401).send({ message: 'Invalid token or you need to login again.' });
        };

        const newItem = await utils.addItem(req.body);
        if (newItem.added) {
            const item = await utils.findItemById(newItem.id);
            if (item.found) {
                item.data.id = `http://localhost:8080/api/items/${newItem.id}`;
                return res.status(201).send({ "message": item.data });
            }
            return res.status(400).send({ "message": "Item not found" });
        }
        else {
            console.log('error: ', error)
            return res.status(400).send({ "message": error });
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
        const itemInfo = await utils.findItemById(id);
        res.status(200).send({ "message": itemInfo });
    })
    .put(async (req, res) => {
        if (!utils.verifyToken(req)) {
            return res.status(401).send({ message: 'Invalid token or You need to login again.' });
        }
        const { id } = req.params;
        const itemInfo = await utils.findItemById(id);

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
        const itemInfo = await utils.findItemById(id);

        if (itemInfo == ITEM_NOT_FOUND_MSG) {
            res.status(400).send({ "message": itemInfo });
        } else {
            const deletedItem = await utils.deleteItem(id);
            if (deletedItem != undefined) {
                res.status(200).send({ "message": DELETED_MSG });
            }
        };
    });


module.exports = router;