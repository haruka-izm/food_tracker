import React, { useState } from 'react';

import useChat from './useChat';

const ChatRoom = (props) => {
    const ROOM_ID = 1;
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
            <div className="chat-room-container">
                <h1 className="room-name">Room: {ROOM_ID}</h1>
                <div className="messages-container">
                    <ol className="messages-list">

                        {messages.map((message, i) => (
                            <li
                                key={i}
                                className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"
                                    }`}
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
                    className="new-message-input-field"
                />
                <button onClick={handleSendMessage} className="send-message-button">
                    Send
              </button>
            </div>
        </div>

    )

};


export default ChatRoom;