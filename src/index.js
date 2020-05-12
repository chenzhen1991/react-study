// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import {Provider} from 'react-redux';
// import store from './store';
//
// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//   document.getElementById('root')
// );
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


// generator 规则
// function 与函数名之间有个*
// 函数内部使用yield表达式，定义不同状态
// yield 只能用在generator函数里，在别的地方报错
// function* helloWorldGenerator() {
//     yield 'hello';
//     yield 'world';
//     return 'ending';   // return 标记技术，如果不加return也是可以标记结束的
// }
//
// var hw = helloWorldGenerator();
//
// //执行
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())

//
// let a = 0;
// function* fun() {
//     let aa = yield (a = 1 + 1);
//     return aa;
// }
//
// console.log('unc0', a)
//
// let b = fun()
//
// console.log('fun', b.next())
//
// console.log('func', a)

// import React from 'react';
// import ReactDom from 'react-dom';

import React from './zReact';
import ReactDom from './zReact/react-dom';
import Component from './zReact/component'

// 函数式组件
function FunComponent({name}){
    return (<div>
        <p>函数式组件：{name}</p>
        <button onClick={()=>{
            console.log('点击')
        }}>按钮</button>
    </div>)
}

// class组件
class ClassComponent extends Component{
    static defaultProps = {
        text: '默认参数'
    }
    render(){
        return(
            <div>
                classComponent:
                {this.props.name}
                <span>{this.props.text}</span>
            </div>
        )
    }
}
const jsx = <div className='border'>
    <p>全栈学习</p>
    <a href="http:baidu.com">百度</a>
    <FunComponent name='组件初体验' />
    <ClassComponent name='class组件' text='传递的值'/>
    <>
        <h1>fragment</h1>
        <h1>测试</h1>
    </>
    {
        [1,2,3].map(item => {
            return(
                <div key={item}>数组元素：{item}</div>
            )
        })
    }
</div>;

ReactDom.render(jsx,document.getElementById('root'))

// console.log('version', React.version)
