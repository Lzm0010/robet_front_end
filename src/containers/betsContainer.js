import React, {Fragment} from 'react';
import Bet from '../components/bet';
import TrackBetButton from '../components/trackBetButton';

export default function BetsContainer () {
    return (
        <Fragment>
            <Bet/>
            <TrackBetButton />
            {/* add multiple bets and track bets for each bet */}
        </Fragment>
    )
}