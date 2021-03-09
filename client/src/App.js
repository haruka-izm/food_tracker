import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/Home';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import MyAccount from './components/myAccount';

import store from './store';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './theme/theme';


function App() {

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={LogIn} />
                <PublicRoute path="/signup" component={SignUp} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/myAccount" component={MyAccount} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
