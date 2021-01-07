import React, { useEffect, useState } from 'react';
import { getUser, removeUserSession } from '../utils/Common';
import Navbar from './Navbar';
import Items from './Items';

function Dashboard(props) {
    const user = props.email;
    const [firstLoad, setFirstLoad] = useState(true);
    const [items, setItems] = useState([]);

    const test = ['a', 'b', 'c'];

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    useEffect(() => {
        if (firstLoad) {
            async function fetchData() {
                const reqOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
                };

                const res = await fetch('http://localhost:8080/api/all_items', reqOptions);

                if (res.status === 200) {
                    const json = await res.json();
                    const message = json.message;
                    setItems(message);
                    console.log('msg:', message)
                    console.log("how about items: ", items)

                }

                if (res.status === 400) {
                    console.log('400 called')
                    const json = await res.json();
                    // setError(json.message);
                    //setError(error.res.data.message)
                } else {
                    console.error('API error /api/login ', res);

                }

            }
            fetchData();
            setFirstLoad(false);
            return;
        }
        console.log('no effect')
    })



    return (
        <div>
            <div id="navbar">
                <Navbar />
            </div>

            <div id='content'>
                <div>
                    <Items items={items} />
                </div>
                <div>
                    <input type='button' onClick={handleLogout} value='Logout' />
                </div>

            </div>



        </div >
    )
};

export default Dashboard;