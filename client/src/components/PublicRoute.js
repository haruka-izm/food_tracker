import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
    console.log("PublicRoute called")
    return (
        <Route
            {...rest}
            render={(props) => isAuthenticated == false || isAuthenticated == null ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />}
        />
    )
};


export default connect(state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
})(PublicRoute);