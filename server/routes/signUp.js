const express = require('express');
const router = express.Router();
const utils = require('../utils');


router.post("/", async (req, res) => {
    const { email, password, username, hasCode, householdName = "" } = req.body;
    let { householdCode = "" } = req.body;


    if (email.length == 0 || password.length == 0 || username.length == 0) {
        return res.status(400).send({ message: "Please provide required information." });
    };

    // if householdCode is provided, check if the code is valid
    let householdInfo;
    let householdId;

    if (householdCode.length != 0) {
        console.log("household code: ", householdCode)
        householdInfo = await utils.verifyHouseholdCode(householdCode);
        console.log('result: ', householdInfo.found)

        if (!householdInfo.found) {
            return res.status(400).send({ message: "Provided code is wrong. Please try again." });
        };
        console.log("house code found")
        householdId = householdInfo.data[0].id;
    };

    // if a new user doesn't have a household code, generate a new one and create a new household
    if (hasCode == 'false' && householdName == "") {
        return res.status(400).send({ message: "Please provide a household name." });
    };


    // if a new user wants to create a new household
    if (hasCode == 'false' && householdCode.length == 0) {
        householdCode = utils.generateNewHouseholdCode();

        const newHousehold = await utils.createNewHousehold(householdCode, householdName);
        if (newHousehold.create == false) {
            return res.status(400).send({ message: "Please try again." });
        };

        householdId = newHousehold.id;
    };

    const userData = {
        email: email,
        password: password,
        username: username,
        householdId: householdId
    };

    const newUser = await utils.createNewUser(userData);
    if (!newUser.created) {
        console.log("failed to create new user")
        return res.status(400).send({ message: `The user: ${email} already exists.` });
    };

    const token = await utils.generateToken(newUser.id);
    if (token == null) {
        return res.status(400).send({ message: "authentication failed." });
    };

    const response = utils.setCookie(res, token);
    return response.status(201).send({
        message: `a new user: ${email} is created.`,

        // todo : displayName : <change this part>
        displayName: "99999"
    });
});


module.exports = router;
