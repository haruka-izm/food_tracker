import React from 'react';

import Navbar from '../Navbar';
import ChatBox from './ChatBox';
import ChatRoom from './ChatRoom';

const Chat = () => {
    return (
        <div>
            <div id="navbar">
                <Navbar />
            </div>

            <div id="content">
                <ChatRoom />

            </div>
        </div>
    )
}


export default Chat;