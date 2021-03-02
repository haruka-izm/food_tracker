const express = require('express');
const router = express.Router();
const utils = require('../utils');


router.post("/", async (req, res) => {
    const { email, password, username } = req.body;

    if (email.length == 0 || password.length == 0) {
        return res.status(400).send({ message: "Please provide required information." });
    };

    const newUser = await utils.createNewUser(email, password, username);
    if (!newUser.created) {
        return res.status(400).send({ message: `The user: ${email} already exists.` });
    };

    //if (newUser.result == 'CREATED') {
    const token = await utils.generateToken(newUser.id);
    if (token == null) {
        return res.status(400).send({ message: "authentication failed." });
    }
    res.cookie('token', token, {
        expires: new Date(Date.now() + 60 * 60 * 24 * 30),  // 30 days
        secure: false,
        httpOnly: true,
    });

    return res.status(201).send({ message: `a new user: ${email} is created.` });
    //};


});


module.exports = router;
