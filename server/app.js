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
const items = require("./routes/items");


app.use(json({ extended: false }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// to do (if possible): add middleware
app.use("/api/signup", signUp);
app.use("/api/login", login);
app.use("/api/items", items);


app.listen(port);



