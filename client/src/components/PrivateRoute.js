import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { requestOptions, urlOptions } from '../constants';



function PrivateRoute({ component: Component, isAuthenticated, isLoggingOut, ...rest }) {
  console.log("PrivateRoute called")
  console.log(`current auth status: ${isAuthenticated} \n
  isLoggingOut: ${isLoggingOut}`)

  async function verifyUser() {
    const res = await fetch(urlOptions.USER_QUERY, requestOptions.GET);
    if (res.status === 200) {
      const json = await res.json();
      rest.dispatch(actions.isValidUser(json));

    } else {
      rest.dispatch(actions.isNotValidUser());
    };
  };

  useEffect(() => {
    console.log("useEffect called")
    //if (isAuthenticated === null && !isLoggingOut) {
    if (isAuthenticated === null) {
      //todo yo yo yo add isLoggingOut to redux state (right?..) and 
      //set it to true when 'log out' button is clicked. Maybe set it to false when 
      // 'log in' or 'sign up' is clicked?..
      verifyUser();

    }
  }, [isAuthenticated]);


  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated == null ? "loading" :
        isAuthenticated == true ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  );
};


export default connect(state => {
  return {
    isAuthenticated: state.isAuthenticated,
    isLoggingOut: state.isLoggingOut
  }
})(PrivateRoute);

/*
<Redirect to="path/to/page" />

- if want to protect the route from anauthrized users
- place <Redirect /> inside of a component's render(), or won't work
- to  : string, obj
- from: a pathname to redirect from

- want to redirect after a certain action
  --> use `history.push()`

- want to redirect after clicking some element
  --> `history.push()` or <Link />


*/