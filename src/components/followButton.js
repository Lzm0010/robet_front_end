import React, {Fragment} from 'react';
import Fab from '@material-ui/core/Fab';
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled'


export default function FollowButton ({handleClick, followingState}) {

    return (
        <Fab onClick={handleClick} size="medium" aria-label="follow/unfollow" variant="extended" color="primary">
            {followingState ? <Fragment><PersonAddDisabledIcon/>Unfollow</Fragment> : <Fragment><PersonAddIcon/>Follow</Fragment>} 
        </Fab>
    )
}