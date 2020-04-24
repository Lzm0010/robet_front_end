import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={Auth}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/profile" component={Profile} />
        <Route render={() => <Redirect to='/' />} />
      </Fragment>
    </Router>
  );
}

export default App;
