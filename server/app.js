require('dotenv').config();

const express = require('express');
const { json, urlencoded } = express; // json: body-parser
const cors = require('cors');
const socket = require('socket.io');
//const bodyParser = require('body-parser');

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

const port = 8080;
const app = express();
const server = app.listen(port);
const corsOptionsForSocket = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type'],
        credentials: true
    }
};
const io = socket(server, corsOptionsForSocket);
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

const signUp = require("./routes/signUp");
const login = require("./routes/logIn");
const logout = require("./routes/logOut");
const items = require("./routes/items");
const users = require("./routes/users");

const corsOptions = { credentials: true, origin: 'http://localhost:3000' };

app.use(json({ extended: false }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

// to do (if possible): add middleware
app.use("/api/signup", signUp);
app.use("/api/login", login);
app.use("/api/items", items);
app.use("/api/logout", logout);
app.use("/api/users", users);


io.on('connection', socket => {
    const { roomId } = socket.handshake.query;
    socket.join(roomId);
    console.log(`joined chat at ${roomId}`)

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.to(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    socket.on('disconnect', () => {
        socket.leave(roomId);
    })
});


module.exports = app;
//app.listen(port);




