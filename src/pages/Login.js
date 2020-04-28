import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../action/userAction'

export default connect(({user}) => ({isLogin:user.isLogin}), {
    login
})(class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ""}
    }

    handleChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        const {isLogin, location, login} = this.props;
        const {redirect = ''} = location.state || {};
        if (isLogin) {
           return <Redirect to={redirect} />
        }
        return (
            <div>
                <h3>login</h3>
                <input type='text' value={this.state.name} onChange={this.handleChange} />
                <button onClick={() => login({name: this.state.name})}>login</button>
            </div>
        )
    }
})
