import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import User from './User';
import notFount from './404';

export default class ReactRouterPage extends Component {
    render() {
        return (
            <div>
                <h3>ReactRouterPage</h3>
                <Router>
                    <Link to='/'>首页</Link>
                    <Link to='/user'>用户界面</Link>
                    <Link to='/login'>登录界面</Link>

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route strict exact sensitive path='/user' component={User} />
                        <Route exact path='/login' component={Login}  />
                        <Route component={notFount}  />
                    </Switch>
                </Router>
            </div>
        )
    }
}
