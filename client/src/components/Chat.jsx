import React from 'react';

import Navbar from './Navbar';
import ChatBox from './ChatBox';

const Chat = () => {
    return (
        <div>
            <div id="navbar">
                <Navbar />
            </div>

            <div id="content">
                <ChatBox />
            </div>
        </div>
    )
}


export default Chat;