const express = require('express');
const router = express.Router();
const utils = require('../utils');

router.get('/me', async (req, res) => {
    // todo: need to verify token?
    const isVerified = await utils.verifyToken(req);
    if (!isVerified) {
        return res.status(404).send({ message: "You need to log in" });
    };

    const userID = await utils.getUserId(req);

    const user = await utils.findById(userID);
    let userInfo = { displayName: user.name };
    res.status(200).send(userInfo);

});


module.exports = router;