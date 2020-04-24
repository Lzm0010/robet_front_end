import React from 'react';

export default function Login () {
    // do i need to set user state?
    //do i need to lift this login method to app

    const loginUrl = "http://localhost:3000/login";
    
    const login = (user) => {
        const postObj = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({user})
        }
        
        return fetch(loginUrl, postObj)
                .then(res => res.json())
                .then(user => {
                    if(user.token){
                        localStorage.setItem('user', JSON.stringify(user.user))
                        localStorage.setItem('token', user.token)
                    }
                })
                .catch(err => console.log(err))
    }

    return (
        <div>Login</div>
    );
}