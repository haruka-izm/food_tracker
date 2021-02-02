import React, { useEffect, useState } from 'react';
import { removeUserSession } from '../utils/Common';
import Navbar from './Navbar';
import Items from './Items';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


function Dashboard(props) {
    const user = props.email;
    /*
    const [isLoaded, setIsLoaded] = useState(false);
    //const [items, setItems] = useState([]);

    /*
    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    };

    

    async function fetchData() {
        const reqOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
        };

        setIsLoaded(true);
        const pageSize = 5;
        //const offset = props.offset;
        const offset = 0;
        console.log("offset? : ", offset)
        let QUERY_URL = `http://localhost:8080/api/items/query?limit=${pageSize}&offset=${offset}`;
        const res = await fetch(QUERY_URL, reqOptions);

        if (res.status === 200) {
            console.log("res: ", res);
            const json = await res.json();
            const message = json.message;
            console.log("msg: ", message)
            props.dispatch(actions.getItems(message));
        }

        if (res.status === 400) {
            console.log('400 called')
            const json = await res.json();
            // setError(json.message);
            //setError(error.res.data.message)
        } else {
            console.error('API error /api/login ', res);
        }

    };

    useEffect(() => {
        if (!isLoaded) {
            fetchData();
        }
    });

*/
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
export default Dashboard;