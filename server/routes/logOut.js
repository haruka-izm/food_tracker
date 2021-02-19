const express = require('express');
const router = express.Router();
const utils = require('../utils');


router.get("/", (req, res) => {
    utils.clearToken(res);
});


module.exports = router;