import React, {Fragment} from 'react';
import BetsContainer from '../containers/betsContainer';
import {makeStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
    logo: {
      width: 30,
      height: 20
    },
    cells: {
        fontSize: 11
    }
});

function importAll(r){
    let images = {};
    r.keys().map(item => images[item.replace('./', '')] = r(item));
    return images;
}

const logos = importAll(require.context('../assets/images/mlb', false, /\.gif$/)); 

export default function Event ({event, addBet}) {
    const classes = useStyles()
    
    const mapLogo = () => {
        const homeTeam = logos[`${event.home_team.logo}`]
        const awayTeam = logos[`${event.away_team.logo}`]
        return [homeTeam, awayTeam]
    }

    const positionLogo = (bet) => {
        if (bet.position === "Home"){
            return <img className={classes.logo} src={logos[`${event.home_team.logo}`]} alt={bet.position} />
        } else if (bet.position === "Away") {
            return <img className={classes.logo} src={logos[`${event.away_team.logo}`]} alt={bet.position} />
        } else {
            return bet.position
        }
    }

    return (
        <Fragment>

        {event !== undefined ? (
            <TableRow hover role="checkbox" tabIndex={-1} key={`event-row-${event.id}`}>
                <TableCell component="th" scope="row" className={classes.cells}>
                   <img className={classes.logo} src={mapLogo()[1]} alt={event.away_team.name}/> {event.away_team.name} @ <img className={classes.logo} src={mapLogo()[0]} alt={event.home_team.name}/> {event.home_team.name}
                </TableCell>
                <BetsContainer bets={event.bets} addBet={addBet} positionLogo={positionLogo}/>
            </TableRow>
            ):(
            <TableRow>
                <TableCell className={classes.cells}>
                    Event is still fetching...
                </TableCell>
            </TableRow>
        )}
        </Fragment>
    )
}