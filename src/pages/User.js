import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../action/userAction'

@connect(({user}) => ({user}), {logout})
class User extends Component{
    render() {
        console.log(this.props)
        const {user, logout} = this.props
        const {id, name, score} = user.userInfo;
        return (
            <div>
                <h3>user</h3>
                <p>id: {id}</p>
                <p>name: {name}</p>
                <p>score: {score}</p>
                <button onClick={() => logout()}>登出</button>
            </div>
        )
    }
}

export default User;
