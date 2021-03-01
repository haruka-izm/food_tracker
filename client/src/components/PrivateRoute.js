import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { requestOptions, urlOptions } from '../constants';



function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  console.log("Private route called")
  console.log("BEFORE validation isAuthed: ", isAuthenticated)

  async function verifyUser() {
    console.log("users/me called")

    const res = await fetch(urlOptions.USER_QUERY, requestOptions.GET);
    if (res.status === 200) {
      console.log("users/me true")
      const json = await res.json();
      rest.dispatch(actions.isValidUser(json));

      // isAuhenticated not using updated Redux state: still `false`
      console.log('AFTER called users/me isAuthed: ', isAuthenticated);
      return true;

    } else {
      rest.dispatch(actions.isNotValidUser());
      return false;
    };

  };

  useEffect(() => {
    if (isAuthenticated === null) {
      verifyUser();
    }
  }, [isAuthenticated]);

  console.log('last line');

  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated == null ? "loading..."
        : isAuthenticated == true ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
};


export default connect(state => {
  console.log('state: ', state.isAuthenticated)
  return {
    isAuthenticated: state.isAuthenticated
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