/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from 'react';
import {RouterContext} from './Context'

export default class Link extends Component {
    static contextType = RouterContext
    constructor(props) {
        super(props)
        this.state = {}
    }
    hindleClick = event => {
        const {history} = this.context
        //阻止默认事件
        event.preventDefault();
        console.log(history);
        
        history.push(this.props.to)
    }
    render() {
        const {to, children} = this.props
        return <a href={to} onClick={this.hindleClick}>{children}</a>
    }
}
