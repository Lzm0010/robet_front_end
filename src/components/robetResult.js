import React, {Fragment} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    win: {
        color: 'green',
    },
    loss: {
        color: 'red',
    },
    push: {
        color: 'grey'
    },
    logo: {
        width: 29,
        height: 19
    }
})

function importAll(r){
    let images = {};
    r.keys().map(item => images[item.replace('./', '')] = r(item));
    return images;
}

const mlb_logos = importAll(require.context('../assets/images/mlb', false, /\.gif$/)); 
const nfl_logos = importAll(require.context('../assets/images/nfl', false, /\.gif$/)); 
const nba_logos = importAll(require.context('../assets/images/nba', false, /\.gif$/));
const logos = {...mlb_logos, ...nfl_logos, ...nba_logos};

export default function RobetResult ({prediction}) {
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

    const renderSwitch = (param) => {
        switch(param) {
            case 'Win':
                return <span className={classes.win}>W </span>;
            case "Loss":
                return <span className={classes.loss}>L </span>;
            case "Push":
                return <span className={classes.push}>P </span>;
            default:
                return null;
        }
    }

    return (
        <Fragment>
        {prediction !== undefined ? (
            <TableRow hover role="checkbox" tabIndex={-1} key={`robet-row-${prediction.id}`}>
                <TableCell component="th" scope="row">
                <img className={classes.logo} src={mapLogo()[1]} alt={prediction.event.away_team.name}/> {prediction.event.away_team.name} @ <img className={classes.logo} src={mapLogo()[0]} alt={prediction.event.home_team.name}/> {prediction.event.home_team.name}
                </TableCell>
                <TableCell>
                {positionLogo()} {prediction.line !== null ? <span>| {prediction.line}</span> : null}
                </TableCell>
                <TableCell>
                    {parseFloat(prediction.prediction.away_score).toFixed(2)} | {parseFloat(prediction.prediction.home_score).toFixed(2)}
                </TableCell>
                <TableCell>
                    {parseFloat(prediction.prediction_delta).toFixed(3)}
                </TableCell>
                <TableCell>
                    {renderSwitch(prediction.outcome)}
                    {prediction.event.away_score} - {prediction.event.home_score}
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