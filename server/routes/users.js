const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
    // todo: add ID col(PK & AI) in DB
    //       put ID into the token
    // todo add user display name

    // get ID from the token

    // look up the user by ID

    // return the display name
    let user = { displayName: "John" };
    res.status(200).send(user);

});


module.exports = router;