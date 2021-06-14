import React from 'react';

import Navbar from '../Navbar';
import ChatRoom from './ChatRoom';

import { withStyles } from "@material-ui/core/styles";
import style from '../../styles/styleChat';

const Chat = (props) => {
    const { classes } = props;
    return (
        <div>
            <div id="navbar">
                <Navbar />
            </div>

            <div className={classes.chat}>
                <ChatRoom />

            </div>
        </div>
    )
}


export default withStyles(style)(Chat);