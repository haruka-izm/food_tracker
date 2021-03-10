const express = require('express');
const router = express.Router();
const utils = require('../utils');

router.get('/me', async (req, res) => {
    const verified = await utils.verifyToken(req, res);
    if (!verified) {
        return verified.response.status(401).send({ message: "You need to log in" });
    };

    const userID = await utils.getUserId(req);
    const user = await utils.findUserById(userID);

    if (user.found) {
        let userInfo = { displayName: user.data.username };
        return verified.response.status(200).send(userInfo);
    }
});


module.exports = router;