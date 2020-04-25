import React, { Component } from 'react';
import {RouterContext} from './Context'

export default class Router extends Component {
    static computeRootMatch = (pathname) => {
        return{
            path:'/',
            url:"/",
            params:{},
            isExact: pathname === '/'
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            location: props.history.location
        }
    }

    componentDidMount(){
        this.unlistenner = this.props.history.listen(location => {
            this.setState({location})
        })
    }

    componentWillUnmount() {
        if(this.unlistenner){
            this.unlistenner()
        }
    }
    
    render() {
        const {children, history} = this.props
        return (
            // 表示里面是一个对象
            <RouterContext.Provider 
                value={{
                    history:history,
                    location: this.state.location,
                    match:Router.computeRootMatch(this.state.location.pathname)
                }}>
                {children}
            </RouterContext.Provider>
        )
    }
}
