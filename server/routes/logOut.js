const express = require('express');
const router = express.Router();
const utils = require('../utils');


router.get("/", (req, res) => {
    console.log("1111111111111111111111111111111111111111111111111111");
    console.log(req);
    console.log("2222222222222222222222222222222222222222222222222222");

    utils.clearToken(res);
});


module.exports = router;