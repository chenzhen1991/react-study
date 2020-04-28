import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


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
