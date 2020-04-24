import React, {Fragment} from 'react';
import TrackBetButton from './trackBetButton';

export default function Bet ({bet, addBet}) {
    return (
        <Fragment>

        {bet !== undefined ? (
            <Fragment>
                <span>
                    {bet.position} |
                    {bet.odds} |
                    {bet.line !== null ? bet.line : null}
                    <TrackBetButton key={bet.id} betId={bet.id} addBet={addBet}/>
                </span>  
                   
            </Fragment>
            ):(
            <div>Bet is still fetching...</div>
        )}
        </Fragment>
    )
}