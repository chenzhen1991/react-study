// import { createStore } from "redux";
import { createStore } from "../zredux";


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

const store = createStore(cunterReducer);

export default store;