import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './utils/Common';
import { Provider } from 'react-redux';
//import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';

import store from './store';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

//import './App.css';


// want to pass prop on <Route /> => use `render`prop
// render={props => <Destination_component {...props} prop_name=value />}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              {/*
             <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signup" component={SignUp} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
      
             */}

              {/* to do:
            
            for dev purpose: token validation is disabled
    need to use `PublicRoute` & `PrivateRoute` to protect private pages

*/}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
