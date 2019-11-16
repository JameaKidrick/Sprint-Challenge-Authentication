import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Jokes from './components/Jokes';

function App() {
  const logOut = () => {
    localStorage.removeItem('token')
  }
  
  return (
    <div className="App">
      <Router>
        <Link to='/login'> Login </Link>
        <br />
        <Link to='/register'> Register </Link>
        <br />
        <Link to='/'> Jokes </Link>
        <br />
        <Link to='/login' onClick={() => logOut()}> Log out </Link>
        <Switch>
          <Route exact path='/' component={Jokes} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
