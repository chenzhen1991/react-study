import React, {createContext, useContext, useLayoutEffect, useReducer} from 'react';
import {bindActionCreators} from 'redux';

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
    }, [subscribe])

    if(typeof mapDispatchToProps === 'function'){
        dispatchProps = mapDispatchToProps(dispatch)
    }else if(typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />
}

export function useSelector(selector){
    const store = useStore()
    const {getState, subscribe} = store
    const selectState = selector(getState())

    const [, forceUpdate] = useReducer(x => x+1, 0)

    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate()
        })

        return () => {
            if(unsubscribe){
                unsubscribe()
            }
        }
    }, [store, subscribe])

    return selectState
}

export function useDispatch(){
    const store = useStore()
    return store.dispatch;
}

export function useStore() {
    const store = useContext(Context);
    console.log(store);
    
    return store;
}