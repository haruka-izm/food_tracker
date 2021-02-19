import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Common';


function PublicRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => !isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
        />
    )
}

export default PublicRoute;