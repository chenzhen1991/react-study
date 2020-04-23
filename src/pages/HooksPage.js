import React, {useCallback, useEffect, useLayoutEffect, useReducer} from 'react';
import {cunterReducer} from '../store'

// 在初始值的基础上 再处理一下
//用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利
const init = initArg => {
    return initArg + 2
}

export default function HooksPage (props) {
    const [state, dispatch] = useReducer(cunterReducer, 0, init)

    const add = useCallback(() => {
        dispatch({type: 'ADD'})
    },[])

    useEffect(() => {
        console.log('useEffect')
    })

    useLayoutEffect(() => {
        console.log('useLayoutEffect')
    })

    console.log('-----')

    return (
            <div>
                <h3>HooksPage</h3>
                <p>count: {state}</p>
                {/*<button onClick={() => {*/}
                {/*    dispatch({'type': 'ADD'})*/}
                {/*}}>点击增加count</button>*/}
                <button onClick={add}>写在外面的增加函数</button>
            </div>
        )
}