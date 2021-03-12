import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Table from './Table';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { requestOptions, urlOptions } from '../constants';
// import axios from 'axios';


function Dashboard(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    async function fetchData() {
        setIsLoaded(true);

        /* < using axios >

        const res = await axios.get(urlOptions.ITEM_QUERY, requestOptions.GET);
        if (res.status === 200) {
            props.dispatch(actions.getItems(res.data));

        } else {
            //let json = await res.json();
            // setError(json.message);
            //setError(error.res.data.message)
            return false;
        };

        */

        setIsLoaded(true);

        const res = await fetch(urlOptions.ITEM_QUERY, requestOptions.GET);

        if (res.status === 200) {
            const json = await res.json();
            props.dispatch(actions.getItems(json));

        } else {

            //let json = await res.json();
            // setError(json.message);
            //setError(error.res.data.message)
            setIsLoaded(false);
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