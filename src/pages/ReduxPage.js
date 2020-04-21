import React, { Component } from 'react';
import store from '../store'

export default class ReduxPage extends Component {
    componentDidMount(){
        this.unSubScribe = store.subscribe(() => {
            // store 里面的state发生变化 则执行订阅的callback
            // 也就是dispatch执行后，会执行订阅的callback
            console.log('change');
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        if(this.unSubScribe){
            this.unSubScribe()
        }
    }
    add = () => {
        store.dispatch({type: 'ADD', payload: 100})
    }
    render() {
        return (
            <div>
                <p>{store.getState()}</p>
                <button onClick={this.add}>加法</button>
            </div>
        )
    }
}
