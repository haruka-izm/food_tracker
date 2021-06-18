const express = require('express');
const router = express.Router();
const utils = require('../utils');


router.post("/", async (req, res) => {
    const { email, password, username, householdId } = req.body;

    if (email.length == 0 || password.length == 0 || username.length == 0 || householdId.length == 0) {
        return res.status(400).send({ message: "Please provide required information." });
    };

    const householdInfo = await utils.verifyHouseholdId(householdId);
    if (!householdInfo.found) {
        console.log('not found called')
        return res.status(400).send({ message: "Please provide required information." });
    };


    const newUser = await utils.createNewUser(req.body);
    if (!newUser.created) {
        return res.status(400).send({ message: `The user: ${email} already exists.` });
    };

    const token = await utils.generateToken(newUser.id);
    if (token == null) {
        return res.status(400).send({ message: "authentication failed." });
    };

    const response = utils.setCookie(res, token);
    return response.status(201).send({
        message: `a new user: ${email} is created.`,
        displayName: householdInfo.data[0].household_name
    });
});


module.exports = router;
