import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Table from './Table';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


function Dashboard(props) {
    const user = props.email;
    const [isLoaded, setIsLoaded] = useState(false);

    async function fetchData() {
        const reqOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
        };

        setIsLoaded(true);

        const QUERY_URL = 'http://localhost:8080/api/items/query';
        const res = await fetch(QUERY_URL, reqOptions);

        if (res.status === 200) {
            const json = await res.json();
            props.dispatch(actions.getItems(json));

        } else {

            //let json = await res.json();
            // setError(json.message);
            //setError(error.res.data.message)
            return false;
        }

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