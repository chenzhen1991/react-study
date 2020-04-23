import React, {useCallback} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch } from '../reactRedux/Provider';

export default function ReactReduxHooksPage(props) {
    const count = useSelector(({count}) => count)
    console.log(count);
    

    const dispatch = useDispatch()
    const add = useCallback(() => {
            dispatch({type: 'ADD'})
        }, [dispatch])
    return (
        <div>
            <h3>ReactReduxHooksPage</h3>
            <p>{count}</p>
            <button onClick={add}>增加</button>
        </div>
    )
}
