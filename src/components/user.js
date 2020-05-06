import React, {Fragment, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FollowButton from './followButton';

export default function User ({currentUser, user, followUser, unFollowUser}) {
    const [followingState, setFollowingState] = useState(currentUser.active_relationships.some(rship => rship.followed_id === user.id))
    
    const handleClick = () => {
        if (followingState === false){
            followUser(user.id)
            setFollowingState(true)
        } else {
            unFollowUser(user.id)
            setFollowingState(false)
        }
    }

    return (
        <Fragment>
        {user !== undefined ? (
            <TableRow>
                <TableCell align="center" component="th" scope="row">
                    {user.username}
                </TableCell>
                <TableCell align="center">
                    <FollowButton handleClick={handleClick}  followingState={followingState}/>
                </TableCell>
            </TableRow>
            ):(
            <TableRow>
                <TableCell>
                   No Users..
                </TableCell>
            </TableRow>
        )}
        </Fragment>
    )
}