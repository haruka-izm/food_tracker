import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

import { urlOptions, socketOptions } from '../../constants';


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SERVER = urlOptions.SERVER;
//const socket = socketIOClient(SERVER, socketOptions);

const useChat = (roomId) => {

    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {

        socketRef.current = socketIOClient(SERVER, {
            ...socketOptions,
            query: { roomId },
        });


        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);

            console.log("updated messages: ", messages)

        });


        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);


    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    };


    return { messages, sendMessage };
};

export default useChat;