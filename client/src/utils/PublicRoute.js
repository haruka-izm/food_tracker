import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



function PublicRoute({ component: Component, isAuthed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => isAuthed == false ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
        />
    )
}


export default connect(state => {
    return {
        isAuthed: state.isAuthenticated
    }
})(PublicRoute);