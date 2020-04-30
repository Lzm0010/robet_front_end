import React, {Fragment} from 'react';
import Bet from '../components/bet';
import TableCell from '@material-ui/core/TableCell';

export default function BetsContainer ({bets, addBet, positionLogo}) {
   
    return (
        <Fragment>
            {bets !== undefined ? (
                <Fragment>
                    <TableCell>
                        {bets.slice(0,2).map(bet => <Bet key={bet.id} bet={bet} addBet={addBet} positionLogo={positionLogo}/>)}
                    </TableCell>
                    <TableCell>
                        {bets.slice(2,4).map(bet => <Bet key={bet.id} bet={bet} addBet={addBet} positionLogo={positionLogo}/>)}
                    </TableCell>
                    <TableCell>
                        {bets.slice(4,6).map(bet => <Bet key={bet.id} bet={bet} addBet={addBet} positionLogo={positionLogo}/>)}
                    </TableCell>
                </Fragment>
             ) : (<div>Still Fetching...</div>)}
        </Fragment>
    )
}