import React, {Fragment} from 'react';

export default function userStats ({userInfo}) {
    return (
        <Fragment>
            <h4>Record: {userInfo.record.wins} - {userInfo.record.losses} - {userInfo.record.ties}</h4>
        </Fragment>
    )
}