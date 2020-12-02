const express = require('express');
const router = express.Router();
const User = require("../models/user");


router.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);

        await User.createNewUser(user);
        res.status(201).send("a new user is created.");

    } catch (error) {
        console.log(`error is ${error}`)
        res.status(400).send("Please provide required information.");
    }

})



module.exports = router;