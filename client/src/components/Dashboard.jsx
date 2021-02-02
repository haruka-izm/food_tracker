import React, { useEffect, useState } from 'react';
import { removeUserSession } from '../utils/Common';
import Navbar from './Navbar';
import Items from './Items';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


function Dashboard(props) {
    const user = props.email;


    return (
        <div>
            <div id="navbar">
                <Navbar />
            </div>

            <div id='content'>

                <Items />

                {/**
                 * 
                 <div>
                    <input type='button' onClick={handleLogout} value='Logout' />
                </div>
                 */}

            </div>
        </div >
    )
};

// connect(): meke props.dispatch() availeble
export default connect()(Dashboard);