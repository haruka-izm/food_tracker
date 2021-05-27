import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import MyAccount from './components/myAccount';
import Chat from './components/chat/Chat';

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
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/signup" component={Signup} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/myAccount" component={MyAccount} />
                {/**
                 * todo: change `Route` to `PrivateRoute` after
                 * implementing chat
                 * 
                 */}
                <Route path="/chat/:roomId" component={Chat} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
