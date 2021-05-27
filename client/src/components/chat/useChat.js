import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

import { urlOptions, socketOptions } from '../../constants';


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SERVER = urlOptions.SERVER;
const socket = socketIOClient(SERVER, socketOptions);

const useChat = (roomId) => {

    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {

        // socketRef.current -> socket
        const socket = socketIOClient(SERVER, {
            ...socketOptions,
            query: { roomId },
        });


        // socketRef.current -> socket
        socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            console.log("FE received data from BE")

            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socket.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);

            console.log("updated messages: ", messages)

        });

        // Destroys the socket reference
        // when the connection is closed
        // socketRef.current -> socket
        return () => {
            socket.disconnect();
        };
    }, [roomId]);


    // socketRef.current -> socket
    const sendMessage = (messageBody) => {
        socket.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socket.id,
        });
    };


    return { messages, sendMessage };
};

export default useChat;