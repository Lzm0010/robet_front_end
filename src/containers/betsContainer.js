import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Bet from '../components/bet';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
    cells: {
        fontSize: 10
    }
});

export default function BetsContainer ({bets, addBet, positionLogo}) {
    const classes = useStyles();

    return (
        <Fragment>
            {bets !== undefined ? (
                <Fragment>
                    <TableCell className={classes.cells}>
                        {bets.filter(bet => bet.bet_type === "Moneyline").sort((a,b) => a.position.localeCompare(b.position)).map(bet => <Bet key={bet.id} bet={bet} addBet={addBet} positionLogo={positionLogo}/>)}
                    </TableCell>
                    <TableCell className={classes.cells}>
                        {bets.filter(bet => bet.bet_type === "Total").sort((a,b) => a.position.localeCompare(b.position)).map(bet => <Bet key={bet.id} bet={bet} addBet={addBet} positionLogo={positionLogo}/>)}
                    </TableCell>
                    <TableCell className={classes.cells}>
                        {bets.filter(bet => bet.bet_type === "Spread").sort((a,b) => a.position.localeCompare(b.position)).map(bet => <Bet key={bet.id} bet={bet} addBet={addBet} positionLogo={positionLogo}/>)}
                    </TableCell>
                </Fragment>
             ) : (<div>Still Fetching...</div>)}
        </Fragment>
    )
}