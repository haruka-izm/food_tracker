const express = require('express');
const router = express.Router();
const utils = require('../utils');

router.get('/me', async (req, res) => {
    const verified = await utils.verifyToken(req, res);

    if (!verified.result) {
        return res.status(401).send({ message: "You need to log in" });
    };

    //const userID = await utils.getUserId(req); //todo get it from "verified"
    const user = await utils.findUserById(verified.userId);

    if (user.found) {
        let userInfo = { displayName: user.data.username };
        return verified.response.status(200).send(userInfo);
    }; //todo or what?
});

router.route("/preferences")
    .put(async (req, res) => {
        /*
        const verified = await utils.verifyToken(req, res);
        if (!verified.result) {
            return verified.response.status(401).send({ message: 'Invalid token or You need to login again.' });
        };

        */
        //const preferences = req.body;
        const mock = { email_notification: 'true', email: 'test@gamil.com' }
        const updateQuery = await utils.updateUserPreferences(2, mock)

        console.log("res: ", updateQuery)
        console.log("res.update: ", updateQuery.update)
        if (updateQuery.updated == false) {
            return res.status(204).send({ message: "Updating user information failed. Please try again." });
        }

        return res.status(200).send({ message: "Information successfully updated." });
    })


module.exports = router;