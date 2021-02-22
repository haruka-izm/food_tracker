import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';

import store from './store';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

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
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/signup" component={SignUp} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
