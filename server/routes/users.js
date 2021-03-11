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


module.exports = router;