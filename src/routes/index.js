import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoute from "../pages/PrivateRoute";
import User from "../pages/User";
import Login from "../pages/Login";
import NotFount from "../pages/NotFount";

const routes = [
    {
        path:'/',
        component: Home,
        exact: true
    },
    {
        path:'/login',
        component: Login
    },
    {
        path:'/user',
        component: User,
        private: true
    }
]

export default function Routes(props){
    return (
        <Router>
            <Link to='/'>首页</Link>
            <Link to='/user'>用户</Link>
            <Link to='/login'>登录</Link>
            {/*<Link to='/product/123'>产品</Link>*/}
            {/*<Link to='/eee/123'>任意</Link>*/}

            <Switch>
                {/*<Route exact path='/'*/}
                {/*    // children={() => <div>Homechildren</div>}*/}
                {/*       component={Home}*/}
                {/*    // render={() => <div>render</div>}*/}
                {/*></Route>*/}
                {/*<PrivateRoute path='/user' component={User}/>*/}
                {/*/!*<Route path='/user' component={User}></Route>*!/*/}
                {/*<Route path='/login' component={Login}></Route>*/}
                {/*/!* 动态路由 *!/*/}
                {/*/!*<Route path='/product/:id' component={Product}></Route>*!/*/}
                {/*/!* <Route path='/eee/:id' component={Other}></Route> *!/*/}
                {/*<Route component={NotFount}></Route>*/}
                {routes.map(item => {
                    return(
                        item.private
                            ? <PrivateRoute key={item.path+'_router'} path={item.path} component={item.component} exact={item.exact}/>
                            : <Route key={item.path+'_router'} path={item.path} component={item.component} exact={item.exact} />
                    )
                })}
                <Route component={NotFount}></Route>
            </Switch>
        </Router>
    )
}
