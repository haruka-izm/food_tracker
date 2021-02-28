import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


function PublicRoute({ component: Component, isAuthenticated, ...rest }) {

    return (
        <Route
            {...rest}
            render={(props) => isAuthenticated == false ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />}
        />
    )
};


export default connect(state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
})(PublicRoute);