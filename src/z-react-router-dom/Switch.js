import React, { Component } from 'react';
import {RouterContext} from './Context';
import matchPath from './matchPath';

export default class Switch extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    // match 是否匹配
                    // element  如果匹配的话，返回这个元素
                    let match, element;
                    const {location} = context;
                    console.log(location)
                    React.Children.forEach(this.props.children, child => {
                        if(match == null && React.isValidElement(child)){
                            element = child;
                            const {path} = child.props;
                            // console.log(path, context.match, matchPath(location.pathname, child.props))
                            match = path
                                ? matchPath(location.pathname, child.props)
                                : context.match;
                        }
                    })
                    console.log('match', match)
                    return match
                        ? React.cloneElement(element, {computedMatch:match})
                        : null
                }}
            </RouterContext.Consumer>
        )
    }
}
