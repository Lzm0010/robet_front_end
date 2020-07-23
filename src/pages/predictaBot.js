import React, {useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    form: {
        display: "inline-block"
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 140,
    },
    predictions: {
        margin: theme.spacing(2),
        minWidth: 140,
        maxWidth:140,
    },
    button: {
        margin: theme.spacing(2),
        minWidth: 140,
        minHeight: 56,
    }
  }));

const PredictaBot = () => {
    const classes = useStyles();
    const [leagues, setLeagues] = useState([]);
    const [league, setLeague] = useState("");
    const [teams, setTeams] = useState([]);
    const [teamOne, setTeamOne] = useState("");
    const [teamTwo, setTeamTwo] = useState("");
    const [prediction, setPrediction] = useState({});
    
    
    useEffect(() => {
        const leaguesUrl = "https://secure-chamber-07550.herokuapp.com/leagues"
        const abortController = new AbortController()
        const signal = abortController.signal
        const token = localStorage.getItem('token')
        const getObj = {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`
            },
            'signal': signal
        }
        fetch(leaguesUrl, getObj)
        .then(res => res.json())
        .then((leagues) => setLeagues(leagues))
        .catch(err => console.log(err))
        
        return () => abortController.abort();
    }, [])

    const handleLeagueChange = (event) => {
        setLeague(event.target.value)
        const leagueId = leagues.find(league => event.target.value === league.name).id
        const teamsUrl = `https://secure-chamber-07550.herokuapp.com/teams/${leagueId}`
        const token = localStorage.getItem('token')
        const getObj = {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(teamsUrl, getObj)
        .then(res => res.json())
        .then((teams) => setTeams(teams))
        .catch(err => console.log(err))
    }

    const handleAwayTeamChange = (event) => {
        setTeamOne(event.target.value)
    }

    const handleHomeTeamChange = (event) => {
        setTeamTwo(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const predictUrl = `http://localhost:5000/${league}/${teamOne}/${teamTwo}`;
        const token = localStorage.getItem('token')
        const getObj = {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(predictUrl, getObj)
        .then(res => res.json())
        .then(prediction => setPrediction(prediction))
        .catch(err => console.log(err))
    }
    

    return (
        <Container>
            <h2>Predict a Game:</h2>
            <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="league">League</InputLabel>
                <Select
                labelId="league"
                id="league"
                value={league}
                onChange={handleLeagueChange}
                MenuProps={{disablePortal:true}}
                label="League"
                >
                    {leagues.map(league => <MenuItem key={league.id} value={league.name}>{league.name}</MenuItem> )}
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="team-one">Away Team</InputLabel>
                <Select
                labelId="team-one"
                id="team-one"
                value={teamOne}
                onChange={handleAwayTeamChange}
                MenuProps={{disablePortal:true}}
                label="Away Team"
                >
                    {teams.length !== 0 ? teams.map(team => <MenuItem key={team.id} id={team.id} value={team.py_lookup}>{team.name}</MenuItem>) : <MenuItem value=""><em>None</em></MenuItem>}
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="team-two">Home Team</InputLabel>
                <Select
                labelId="team-two"
                id="team-two"
                value={teamTwo}
                onChange={handleHomeTeamChange}
                MenuProps={{disablePortal:true}}
                label="Home Team"
                >
                    {teams.length !== 0 ? teams.map(team => <MenuItem key={team.id} id={team.id} value={team.py_lookup}>{team.name}</MenuItem>) : <MenuItem value=""><em>None</em></MenuItem>}
                </Select>
            </FormControl>
            <Button variant="contained" className={classes.button} type="submit" color="primary">
                Predict
            </Button>
            </form>
            {Object.keys(prediction).length !== 0 ? (
                <Fragment>
                    {prediction[teamOne] !== undefined ? (
                        <FormControl className={classes.predictions}>
                        <TextField
                            label={teamOne}
                            InputProps={{
                                readOnly: true,
                            }}
                            value={parseFloat(prediction[teamOne]["predicted_score"]).toFixed(2)}
                            variant="outlined"
                        />
                        </FormControl>
                    ) : null}
                    {prediction[teamTwo] !== undefined ? (
                        <FormControl className={classes.predictions}>
                        <TextField
                            label={teamTwo}
                            InputProps={{
                                readOnly: true,
                            }}
                            value={parseFloat(prediction[teamTwo]["predicted_score"]).toFixed(2)}
                            variant="outlined"
                        />
                        </FormControl>
                    ) : null}
                </Fragment>
            ) : null}
        </Container>
    );
}

export default PredictaBot;