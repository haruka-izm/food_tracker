import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Table from './Table';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
// import axios from 'axios';

const QUERY_URL = 'http://localhost:8080/api/items/query';

function Dashboard(props) {
    const user = props.email;
    const [isLoaded, setIsLoaded] = useState(false);

    async function fetchData() {
        setIsLoaded(true);

        /* < using axios ver >


        const reqOptions = {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "http://localhost:3000" }
        };
        const res = await axios.get(QUERY_URL, reqOptions);
        if (res.status === 200) {
            props.dispatch(actions.getItems(res.data));

        } else {
            //let json = await res.json();
            // setError(json.message);
            //setError(error.res.data.message)
            return false;
        };

        */


        const reqOptions = {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "http://localhost:3000" }
        };

        setIsLoaded(true);

        const res = await fetch(QUERY_URL, reqOptions);

        if (res.status === 200) {
            const json = await res.json();
            props.dispatch(actions.getItems(json));

        } else {

            //let json = await res.json();
            // setError(json.message);
            //setError(error.res.data.message)
            return false;
        };
    };


    useEffect(() => {
        if (!isLoaded) {
            fetchData();
        }
    });


    return (
        <div>
            <div id="navbar">
                <Navbar />
            </div>

            <div id='content'>
                <Table />
            </div>
        </div >
    )
};


export default connect()(Dashboard);