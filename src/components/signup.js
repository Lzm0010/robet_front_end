import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow:1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 100,
        height: 240,
        width: 200,
        textAlign: 'center'
    }
}));

export default function Signup (props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const signupUrl = "http://localhost:3000/users";

    const signup = (user) => {
        const postObj = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({user})
        }

        return fetch(signupUrl, postObj)
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem('token', user.jwt)
                    props.handleLogin(user.user)
                })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        signup({username, email, password, passwordConfirm})
            .then(() => props.history.push('/dashboard'))
    }

    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
            <form onSubmit={handleSubmit}>
                <input name="username" type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)}/>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
                <input name="passwordConf" type="password" placeholder="Confirm Password" required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
                <button type="submit">Signup</button>
                <button onClick={props.flip}>Login</button>
            </form>
        </Paper>
        </Grid>
    );
}