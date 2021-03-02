const express = require('express');
const router = express.Router();
const utils = require('../utils');

router.get('/me', async (req, res) => {
    const isVerified = await utils.verifyToken(req);
    if (!isVerified) {
        return res.status(401).send({ message: "You need to log in" });
    };

    const userID = await utils.getUserId(req);

    const user = await utils.findUserById(userID);
    if (user.found) {
        let userInfo = { displayName: user.data.username };
        return res.status(200).send(userInfo);
    }
});


module.exports = router;