const express = require('express');
const router = express.Router();
const utils = require('../utils');


router.route("/")
    .post(async (req, res) => {
        const verified = await utils.verifyToken(req, res);
        if (!verified) {
            return res.status(401).send({ message: 'Invalid token or you need to login again.' });
        };

        const newItem = await utils.addItem(req.body, verified.userId);
        if (newItem.added) {
            const item = await utils.findItemById(newItem.id);
            if (item.found) {
                item.data.id = `http://localhost:8080/api/items/${newItem.id}`;
                return verified.response.status(201).send({ "message": item.data });
            }
            return verified.response.status(400).send({ "message": "Item not found" });
        }
        else {
            console.log('error: ', error)
            return verified.response.status(400).send({ "message": error });
        }
    });


router.route("/query")
    .get(async (req, res) => {
        const limit = parseInt(req.query.limit) || 1000;
        const offset = parseInt(req.query.offset) || 0;

        const verified = await utils.verifyToken(req, res);
        if (!verified) {
            return verified.response.status(401).send({ message: 'Invalid token or you need to login again.' });
        };

        const itemInfo = await utils.getItems(limit, offset, verified.userId);
        let totalCount;
        if (offset == 0) {
            totalCount = await utils.getNumOfAllItems(verified.userId);
        }

        if (typeof totalCount == "number") {
            verified.response.status(200).send({
                "message": itemInfo,
                "totalCount": totalCount
            });
        } else {
            verified.response.status(200).send({ "message": itemInfo });
        };
    });


router.route("/:id")
    .get(async (req, res) => {
        const verified = await utils.verifyToken(req, res);
        if (!verified) {
            return verified.response.status(401).send({ message: 'Invalid token or You need to login again.' });
        }
        const { id } = req.params;
        const item = await utils.findItemById(id);
        if (item.found) {
            return verified.response.status(200).send({ "message": item.data });
        }

    })
    .put(async (req, res) => {
        const verified = await utils.verifyToken(req, res);
        console.log("verified: ", verified)
        if (!verified) {
            return verified.response.status(401).send({ message: 'Invalid token or You need to login again.' });
        }
        const { id } = req.params;
        const item = await utils.findItemById(id);

        if (!item.found) {
            return verified.response.status(404).send({ "message": item.data });
        };

        const itemInfo = req.body;
        const updatingItem = await utils.updateItemData(id, itemInfo);
        if (updatingItem.updated) {
            return verified.response.status(201).send({ "message": updatingItem.data });
        };

    })
    .delete(async (req, res) => {
        const verified = await utils.verifyToken(req, res);
        if (!verified) {
            return verified.response.status(401).send({ message: 'Invalid token or You need to login again.' });
        }
        const { id } = req.params;
        const item = await utils.findItemById(id);

        if (!item.found) {
            return verified.response.status(400).send({ "message": item.data });
        };

        const deletingItem = await utils.deleteItem(id);
        if (deletingItem.deleted) {
            return verified.response.status(200).send({ "message": deletingItem.data });
        };
    });


module.exports = router;