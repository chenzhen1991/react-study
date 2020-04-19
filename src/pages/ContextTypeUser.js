
import React, {useContext} from 'react';
import {UserContext} from '../context';

export default function ContextTypeUser(props) {
    const userName = useContext(UserContext)
    console.log(userName);
    
    return (
        <div>
            ContextTypeUser
        </div>
    )
}
