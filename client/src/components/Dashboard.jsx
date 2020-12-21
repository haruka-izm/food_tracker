import React from 'react';

function Dashboard(props) {
    const handleLogout = () => {
        props.history.push('/api/login');
    }

    return (
        <div>Welcome User
            <br />
            <input type='button' onClick={handleLogout} value='Logout' />
        </div>

    )
};

export default Dashboard;