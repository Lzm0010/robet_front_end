import React, {Fragment} from 'react';
import Login from '../components/login';
import Signup from '../components/signup';

export default function Auth () {
    return (
        <Fragment>
            <Login />
            <Signup />
        </Fragment>
    );
}