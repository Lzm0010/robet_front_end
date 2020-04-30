import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Bet from '../components/bet';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
    cells: {
        fontSize: 11
    }
});

export default function BetsContainer ({bets, addBet, positionLogo}) {
    const classes = useStyles();

    return (
        <Fragment>
            {bets !== undefined ? (
                <Fragment>
                    <TableCell className={classes.cells}>
                        {bets.slice(0,2).map(bet => <Bet key={bet.id} bet={bet} addBet={addBet} positionLogo={positionLogo}/>)}
                    </TableCell>
                    <TableCell className={classes.cells}>
                        {bets.slice(2,4).map(bet => <Bet key={bet.id} bet={bet} addBet={addBet} positionLogo={positionLogo}/>)}
                    </TableCell>
                    <TableCell className={classes.cells}>
                        {bets.slice(4,6).map(bet => <Bet key={bet.id} bet={bet} addBet={addBet} positionLogo={positionLogo}/>)}
                    </TableCell>
                </Fragment>
             ) : (<div>Still Fetching...</div>)}
        </Fragment>
    )
}