import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import './App.css';

function App() {
  const [user, setUser] = useState({})

  const handleLogin = (user) => {
    setUser(user)
  }

  return (
    <Router>
      <Fragment>
        <Route exact path="/" render={(props) => <Auth {...props} handleLogin={handleLogin}/>}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/profile" component={Profile} />
        <Route render={() => <Redirect to='/' />} />
      </Fragment>
    </Router>
  );
}

export default App;
