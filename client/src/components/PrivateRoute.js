import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { requestOptions, urlOptions } from '../constants';



function PrivateRoute({ component: Component, isAuthed, ...rest }) {

  const verifyUser = async () => {

    const res = await fetch(urlOptions.USER_QUERY, requestOptions.GET);
    if (res.status === 200) {
      const json = await res.json();
      rest.dispatch(actions.isValidUser(json));
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