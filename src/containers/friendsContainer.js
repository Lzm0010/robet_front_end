import React, {Fragment} from 'react';
import Event from '../components/event';
import UserStats from '../components/userStats';

export default function FriendsContainer () {
    return (
        <Fragment>
            <UserStats/>
            <Event />
            {/* add multiple events by user */}
        </Fragment>
    )
}
