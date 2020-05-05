import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from './context/usersContext';
import PrivateRoute from './privateRoute'
import Home from './pages/home';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import NavDrawer from './containers/navDrawer';


function App() {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState({})
  const [isNavHidden, setIsNavHidden] = useState(true)


  const handleLogin = (user) => {
    setUser(user)
    setAuthed(true)
    setIsNavHidden(false)
  };

  const MainContainer = () => (
    <Fragment>
        {isNavHidden ? null : <NavDrawer/> }
        <PrivateRoute exact path="/dashboard" component={Dashboard} authed={authed} user={user} />
    </Fragment>
  )
  
  return (
      <Provider>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home/>} />
            <Route exact path="/login" render={(props) => <Auth {...props} handleLogin={handleLogin}/>}/>
            <Route component={MainContainer}/>
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
