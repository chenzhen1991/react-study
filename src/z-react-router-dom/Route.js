/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { RouterContext } from './Context';
import matchPath from './matchPath'

export default class Route extends Component {
    // eslint-disable-next-line react/require-render-return
    render() {
        return (<RouterContext.Consumer>
            {context => {
                // console.log(context);
                const {location} = context;
                const {path, computedMatch, children, component, render} = this.props;
                const match = computedMatch
                    ? computedMatch
                    : path
                    ? matchPath(location.pathname, this.props)
                    : context.match;
                const props = {
                    ...context,
                    match
                }
                console.log(match);
                //
                // match children component render 或 null（如果children是function,执行function，是节点直接显示
                // 如果不match children或者 null(只渲染function)
                return (<RouterContext.Provider value={props}>
                   {match
                        ? children
                            ? typeof children ==='function'
                                ? children(props)
                                : children
                            : component
                            ? React.createElement(component, props)
                            : render
                            ? render(props)
                            : null
                        : typeof children === 'function'
                        ? children(props)
                        : null}
                </RouterContext.Provider>)
            }}
        </RouterContext.Consumer>)
    }
}
