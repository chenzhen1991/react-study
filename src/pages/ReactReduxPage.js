import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";


class ReactReduxPage extends Component {
    render() {
        const {num, add, minus} = this.props
        return (
            <div>
                <h2>ReactReduxPage</h2>
                <p>{num}</p>
                <button onClick={add}>增加</button>
                <button onClick={minus}>减少</button>
            </div>
        );
    }
}

// mapStateToProps 函数
const mapStateToProps = state => {
    return {
        num: state
    }
}

//  函数 或者  对象
// const mapDispatchToPros = {
//     add: () => {
//         return {type:'ADD'}
//     },
//     minus: () => {
//         return {type:'MINUS'}
//     }
// }

const mapDispatchToPros = dispatch => {
    // 写法一
    // const add = () => dispatch({type: 'ADD'})
    // const minus = () => dispatch({type: 'MINUS'})
    //
    // return {
    //     add,
    //     minus,
    //     dispatch
    // }

    // 写法二
    let creators = {
        add: () => dispatch({type: 'ADD'}),
        minus: () => dispatch({type:'MINUS'})
    }
    creators = bindActionCreators(creators, dispatch);

    return {
        ...creators,
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(ReactReduxPage);