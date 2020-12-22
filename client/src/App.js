import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';

//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Navbar />
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/api/login" component={Login} />
            <Route path="/api/signup" component={SignUp} />
            <Route path="/api/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
