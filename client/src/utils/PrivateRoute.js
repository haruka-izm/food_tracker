import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const QUERY_URL = "http://localhost:8080/api/users/me";

function PrivateRoute({ component: Component, isAuthed, ...rest }) {

  const verifyUser = async () => {
    const reqOptions = {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "http://localhost:3000" }
    };

    const res = await fetch(QUERY_URL, reqOptions);
    if (res.status === 200) {
      rest.dispatch(actions.isValidUser());
    } else {
      rest.dispatch(actions.isNotValidUser());
    };
  };

  verifyUser();

  return (
    <Route
      {...rest}
      render={(props) => isAuthed == true ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
};


export default connect(state => {
  return {
    isAuthed: state.isAuthenticated
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