import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TrackBetButton from './trackBetButton';

const useStyles = makeStyles({
    logo: {
      width: 29,
      height: 19
    },
    cells: {
        fontSize: 9
    }
});

function importAll(r){
    let images = {};
    r.keys().map(item => images[item.replace('./', '')] = r(item));
    return images;
}

const mlb_logos = importAll(require.context('../assets/images/mlb', false, /\.gif$/)); 
const nfl_logos = importAll(require.context('../assets/images/nfl', false, /\.gif$/)); 
const nba_logos = importAll(require.context('../assets/images/nba', false, /\.gif$/));
const logos = {...mlb_logos, ...nfl_logos, ...nba_logos};

export default function Prediction ({prediction, addBet}) {
    const classes = useStyles()

    const mapLogo = () => {
        const homeTeam = logos[`${prediction.event.home_team.logo}`]
        const awayTeam = logos[`${prediction.event.away_team.logo}`]
        return [homeTeam, awayTeam]
    }

    const positionLogo = () => {
        if (prediction.position === "Home"){
            return <img className={classes.logo} src={logos[`${prediction.event.home_team.logo}`]} alt={prediction.position} />
        } else if (prediction.position === "Away") {
            return <img className={classes.logo} src={logos[`${prediction.event.away_team.logo}`]} alt={prediction.position} />
        } else {
            return prediction.position
        }
    }

    return (
        <Fragment>
        {prediction !== undefined ? (
            <TableRow hover role="checkbox" tabIndex={-1} key={`prediction-row-${prediction.id}`}>
                <TableCell component="th" scope="row" className={classes.cells}>
                <img className={classes.logo} src={mapLogo()[1]} alt={prediction.event.away_team.name}/> {prediction.event.away_team.name} @ <img className={classes.logo} src={mapLogo()[0]} alt={prediction.event.home_team.name}/> {prediction.event.home_team.name}
                </TableCell>
                <TableCell className={classes.cells}>
                    {positionLogo()} {prediction.line !== null ? <span>| {prediction.line}</span> : null}
                </TableCell>
                <TableCell className={classes.cells}>
                    {parseFloat(prediction.prediction.away_score).toFixed(2)} | {parseFloat(prediction.prediction.home_score).toFixed(2)}
                </TableCell>
                <TableCell className={classes.cells}>
                    {parseFloat(prediction.prediction_delta).toFixed(3)}
                </TableCell>
                <TableCell>
                    <TrackBetButton key={`pb-${prediction.id}`} betId={prediction.id} addBet={addBet} />
                </TableCell>
            </TableRow>
            ):(
            <TableRow>
                <TableCell>
                    Prediction is still fetching...
                </TableCell>
            </TableRow>
        )}
        </Fragment>
    )
}