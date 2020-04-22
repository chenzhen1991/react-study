// import {createStore, applyMiddleware, combineReducers} from "redux";
import { createStore, applyMiddleware, combineReducers } from "../zredux";

// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import rdPromise from 'redux-promise';
import isPromise from 'is-promise';
import {isFSA} from 'flux-standard-action';


// 定义修改规则
export const cunterReducer = (state = 0, {type, payload = 1}) => {
    switch (type) {
        case 'ADD': 
           return state + payload;
        case 'MINUS':
           return state - payload;
        default:
            return state;
    };
};

const store = createStore(combineReducers({home:cunterReducer}), applyMiddleware(thunk, logger, rdPromise));

export default store;

function logger ({getState}) {
    // console.log(getState)
    return next => action => {
        console.log('prev', getState())
        let returnValue = next(action)
        // console.log('next', getState())
        return returnValue
    }
}

function thunk({dispatch, getState}) {
    return next =>action=> {
        if(typeof action === 'function') {
            return action(dispatch, getState)
        }

        return next(action)
    }
}

function rdPromise({dispatch}) {
    return next =>action=> {
        if(!isFSA(action)) {
            return isPromise(action) ? action.then(dispatch) : next(action)
        }

        return next(action)
    }
}