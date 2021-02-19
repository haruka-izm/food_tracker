import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


/*
{component: Component, ...rest}
-> assign property `component` defined on props to `Component`
-> ...rest: take all remaining properties defined on props to `rest`


*/


function PrivateRoute({ component: Component, isAuthed, ...rest }) {
  console.log("private", isAuthed)
  return (
    <Route
      {...rest}
      render={(props) => isAuthed == true ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

//export default PrivateRoute;
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