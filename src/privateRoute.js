import React from 'react';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute({ component: Component, authed, ...rest }) {

  return(
    <Route {...rest} render={props =>
        authed ? (
            <Component {...props} {...rest} />
        ) : (
            <Redirect to="/login" />
        )
    }
    />
  );
}

export default PrivateRoute;