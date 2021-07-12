import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Navbar from '../Navbar';
import EmailNotification from './EmailNotification';
import HouseholdId from './HouseholdId';

import { withStyles } from "@material-ui/core/styles";
import style from '../../styles/styleMyAccount';

const MyAccount = (props) => {

    return (
        <div>
            <div id="navbar">
                <Navbar />
            </div>
            <div id="content">
                <EmailNotification />
                <HouseholdId />
            </div>
        </div>
    )

};

export default withStyles(style)(withRouter(MyAccount));