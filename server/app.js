const express = require('express');
const port = 3000;
const { json, urlencoded } = express; // json: body-parser
/*
req.body: undefined

also add following,
    - app.use(express.json({ extended: false }));
        -- extended: false  --> returned value can be str/array
    - app.use(json()); 
        -- json(): to recognize the incoming Request Object as a JSON obj

    - app.use()
        -- middleware
*/

// usually called: app, server
const app = express();

const signUp = require("./routes/signUp");


app.use(json({ extended: false }));
app.use(json());
app.use(urlencoded({ extended: false }));
//app.use(testRoute);
app.use("/api", signUp);




app.listen(port);



