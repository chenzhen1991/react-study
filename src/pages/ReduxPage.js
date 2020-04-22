import React, { Component } from 'react';
import store from '../store'

export default class ReduxPage extends Component {
    constructor(prop){
        super()
        this.state = {
            counterNumber: 0
        }
    }
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
        store.dispatch({type: 'ADD', payload: this.state.counterNumber})
    }
    asyAdd = () => {
        store.dispatch((dispatch, getState) => {
            setTimeout(() => {
                dispatch({type: 'ADD', payload: 5})
            },1000)
        })
    }
    promiseMinus = () => {
        store.dispatch(Promise.resolve({type: 'MINUS', payload: 3}))
    }

    changeHandle = (event) => {
        console.log(event.target.value)
        this.setState({
            counterNumber:Number(event.target.value)
        })
    }
    render() {
        console.log('store',store.getState().home)
        return (
            <div>
                <input type="number" placeholder='请输入数字' value={this.state.counterNumber} onChange={this.changeHandle}/>
                <p>{store.getState().home}</p>
                <button onClick={this.add}>加法</button>
                <button onClick={this.asyAdd}>asyAdd加法</button>
                <button onClick={this.promiseMinus}>promiseMinus</button>
            </div>
        )
    }
}
