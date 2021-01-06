import React from 'react';
import { getUser, removeUserSession } from '../utils/Common';

function Dashboard(props) {
    const user = props.email;
    console.log("user passed?: ", user);

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    return (
        <div>Welcome {user}
            <br />
            <input type='button' onClick={handleLogout} value='Logout' />
        </div>

    )
};

export default Dashboard;