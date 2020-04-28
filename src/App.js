import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  // withRouter,
  // Prompt
} from 'react-router-dom';
// import {
//   BrowserRouter as Router,
//   Link,
//   Route,
//   Switch,
//   useHistory,
//   useLocation,
//   useRouteMatch,
//   useParams,
//   withRouter
// } from './z-react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import NotFount from './pages/NotFount';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to='/'>首页</Link>
        <Link to='/user'>用户</Link>
        <Link to='/login'>登录</Link>
        <Link to='/product/123'>产品</Link>
        <Link to='/eee/123'>任意</Link>

         <Switch>
          <Route exact path='/'
            // children={() => <div>Homechildren</div>} 
            component={Home} 
            // render={() => <div>render</div>}
          ></Route>
           <PrivateRoute path='/user' component={User}/>
          {/*<Route path='/user' component={User}></Route>*/}
          <Route path='/login' component={Login}></Route>
          {/* 动态路由 */}
          <Route path='/product/:id' component={Product}></Route>
          {/* <Route path='/eee/:id' component={EEE}></Route> */}
          <Route component={NotFount}></Route>
         </Switch>
      </Router>
    </div>
  );
}

function Product(props){
  // console.log(props);
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const params = useParams();
  // const {match} = props
  const {id} = match.params

  console.log('props', history, location, match, params);
  return(
  <div>Producthhhhh === {id}</div>
  )
}

// @withRouter
// class EEE extends Component{
//   render(){
//     console.log(this.props);
//     return (
//       <div>
//           <h3>3333</h3>
//           <Link to='/'>go home</Link>
//           <Prompt when={true} message='你确定要离开吗'/>
//       </div>
//     )
//   }
// }

export default App;
