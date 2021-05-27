import React, { useState } from 'react';
import { io } from 'socket.io-client';

import { urlOptions, socketOptions } from '../../constants';


const SERVER = urlOptions.SERVER;
const socket = io(SERVER, socketOptions);

const ChatBox = () => {

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    //const socketRef = useRef();

    const handleOnChange = event => {
        setNewMessage(event.target.value);
    }

    const handleSendMessage = () => {
        console.log("handle send MSG")
        socket.emit('connection', () => {
            console.log("connected!")
        })
    }

    return (
        <div>
            <ul id="messages"></ul>
            <form id="form" action="">
                <input id="input" autocomplete="off" onChange={handleOnChange} />
                <button onClick={handleSendMessage}>Send</button>
            </form>
        </div>
    );

};

export default ChatBox;