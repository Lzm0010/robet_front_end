import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';

export default function Login (props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUrl = "http://localhost:3000/login";
    
    const login = (user) => {
        const postObj = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({user})
        }

        return fetch(loginUrl, postObj)
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem('token', user.jwt)
                    props.handleLogin(user.user)
                })

    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        login({username, password})
            .then(() => props.history.push('/dashboard'))
    }

    return (
        <Paper elevation={3}>
            <form onSubmit={handleSubmit}>
                <input name="username" type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                <button onClick={props.flip}>Signup</button>
            </form>
        </Paper>

    );
}