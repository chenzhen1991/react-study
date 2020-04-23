import React, {createContext, useContext, useLayoutEffect, useReducer} from 'react';
import {bindActionCreators} from 'redux'

const Context = React.createContext();

export function Provider({children, store}) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}

export const connect = (
    mapStateToProps,
    mapDispatchToProps
) => WrapperComponent => props => {
    const store = useContext(Context);
    const {getState, dispatch, subscribe} = store;
    const stateProps = mapStateToProps(getState())
    console.log(stateProps)

    let dispatchProps = {dispatch}

    const [, forceUpdate]= useReducer(x => x+1, 0)

    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate()
        })

        return () => {
            if(unsubscribe) {
                unsubscribe()
            }
        }
    }, [])

    if(typeof mapDispatchToProps === 'function'){
        dispatchProps = mapDispatchToProps(dispatch)
    }else if(typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />
}