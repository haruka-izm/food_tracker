import React, { useEffect, useState } from 'react';
import { getUser, removeUserSession } from '../utils/Common';
import Navbar from './Navbar';

function Dashboard(props) {
    const user = props.email;
    const [firstLoad, setFirstLoad] = useState(true);
    const [content, setContent] = useState('');


    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    useEffect(async () => {
        if (firstLoad) {
            // fetch data
            const reqOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
            };

            //const res = await fetch('http://localhost:8080/api/login', reqOptions);
            if (res.status === 200) {

            }

            if (res.status === 400) {
                console.log('400 called')
                const json = await res.json();
                // setError(json.message);
                //setError(error.res.data.message)
            } else {
                console.error('API error /api/login ', res);

            }


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
                    result here: {content}
                </div>
                <div>
                    <input type='button' onClick={handleLogout} value='Logout' />
                </div>

            </div>



        </div >
    )
};

export default Dashboard;