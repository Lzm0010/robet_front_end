import React, {Fragment} from 'react';
import TrackBetButton from './trackBetButton';

export default function Bet ({bet, addBet, positionLogo}) {
    return (
        <Fragment>

        {bet !== undefined ? (
            <Fragment>
                <span>
                    {positionLogo(bet)}
                    {bet.odds > 0 ? <span> +{bet.odds} </span> : <span> {bet.odds} </span>}
                    {bet.line !== null ? <span> | {bet.line} </span> : null}
                    <span> <TrackBetButton key={bet.id} betId={bet.id} addBet={addBet}/> </span>
                </span>  
                   
            </Fragment>
            ):(
            <div>Bet is still fetching...</div>
        )}
        </Fragment>
    )
}