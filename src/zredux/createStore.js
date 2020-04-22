export default function createStore (reducer, enhancer) {
    if(enhancer) {
        return enhancer(createStore)(reducer)
    }
    let currentState;
    let currentListeners = [];
    function getState(){
        return currentState;
    }
    function dispatch(action){
        // store里面的数据就更新了
        currentState = reducer(currentState, action);

        // 执行订阅事件
        currentListeners.forEach(listener => listener())
    }
    function subscribe(listener){
        currentListeners.push(listener)

        return () => {
            // currentListeners = []
            var index = currentListeners.indexOf(listener)
            currentListeners.splice(index, 1)
        }
    }

    dispatch({type: new Date().getTime()})
    return {
        getState,
        dispatch,
        subscribe
    }
}