import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



function PublicRoute({ component: Component, isAuthed, ...rest }) {
    console.log('public isAuth: ', isAuthed)
    return (
        <Route
            {...rest}
            render={(props) => isAuthed == false ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
        />
    )
}

//export default PublicRoute;
export default connect(state => {
    return {
        isAuthed: state.isAuthenticated
    }
})(PublicRoute);