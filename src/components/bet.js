import React, {Fragment} from 'react';
import TrackBetButton from './trackBetButton';

export default function Bet ({bet}) {
    return (
        <Fragment>

        {bet !== undefined ? (
            <Fragment>
                <span>
                    {bet.position} |
                    {bet.odds} |
                    {bet.line !== null ? bet.line : null}
                    <TrackBetButton key={bet.id}/>
                </span>  
                   
            </Fragment>
            ):(
            <div>Bet is still fetching...</div>
        )}
        </Fragment>
    )
}