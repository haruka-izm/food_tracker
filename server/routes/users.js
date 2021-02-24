const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
    // todo: confirm status code
    res.status(200).send();

});


module.exports = router;