require('dotenv').config();

const express = require('express');
const port = 8080;
const { json, urlencoded } = express; // json: body-parser
const cors = require('cors');

// need this
const cookieParser = require('cookie-parser');


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
const login = require("./routes/login");
const getItem = require("./routes/getItem");
const getAllItems = require("./routes/getAllItems");

app.use(json({ extended: false }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use("/api", signUp);
app.use("/api", login);
app.use("/api", getItem);
app.use("/api", getAllItems);



app.listen(port);



