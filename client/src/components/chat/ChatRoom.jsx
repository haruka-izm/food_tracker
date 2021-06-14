import React, { useState } from 'react';
import useChat from './useChat';

import { withStyles } from "@material-ui/core/styles";
import style from '../../styles/styleChatRoom';

const ChatRoom = (props) => {
    const ROOM_ID = 1;

    const { classes } = props;

    const { messages, sendMessage } = useChat(ROOM_ID);

    const [newMessage, setNewMessage] = useState('');
    console.log("messages: ", messages)

    const handleNewMessageChange = event => {
        setNewMessage(event.target.value);

    };

    const handleSendMessage = (e) => {
        e.preventDefault();

        console.log("newMessage before sending: ", newMessage)
        sendMessage(newMessage);
        setNewMessage('');

    };


    return (
        <div>
            <div className={classes.chatRoomContainer}>
                <h1 className={classes.roomName}>Room: {ROOM_ID}</h1>
                <div className={classes.messagesContainer}>
                    <ol className={classes.messagesList}>

                        {messages.map((message, i) => (
                            <li
                                key={i}
                                className={`${message.ownedByCurrentUser ? classes.myMessage : classes.receivedMessage}`}
                            >
                                {message.body}
                            </li>
                        ))}
                    </ol>
                </div>
                <textarea
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Write message..."
                    className={classes.newMessageInputField}
                />
                <button onClick={handleSendMessage} className={classes.sendMessageButton}>
                    Send
                </button>
            </div>
        </div>

    )

};


export default withStyles(style)(ChatRoom);