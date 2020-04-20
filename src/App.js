import React, {Fragment} from 'react';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import './App.css';

function App() {
  return (
    <Fragment>
      <Auth />
      <Dashboard />
      <Profile />
    </Fragment>
  );
}

export default App;
