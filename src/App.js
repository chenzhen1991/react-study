import React from 'react';
// import ReduxPage from './pages/ReduxPage'
// import HooksPage from './pages/HooksPage'
import ReactReduxPage from './pages/ReactReduxPage';

function App() {
  
  return (
    <div>
      App
      {/*<ReduxPage />*/}
      {/*<HooksPage />*/}
      <ReactReduxPage />
    </div>
  );
}

export default App;

// const arr = [1,2,3,4]

// const reducer = (accumulator, currentValue) => accumulator + currentValue;

// console.log('总和',arr.reduce(reducer));

// function f1(arg) {
//   console.log('f1', arg);
//   return arg;
// }

// function f2(arg) {
//   console.log('f2', arg);
//   return arg;
// }

// function f3(arg) {
//   console.log('f3', arg);
//   return arg;
// }

// function compose(...funcs) {
//   if(funcs.length ===0){
//     return arg => arg
//   }
//   if(funcs.length ===1){
//     return funcs[0]
//   }
//   return funcs.reduce((a, b) =>(...args) => a(b(...args)))
// }

// let dispatch = compose(f1, f2, f3);
// console.log(dispatch);


// let res = dispatch('omg')

// console.log('结果', res);


