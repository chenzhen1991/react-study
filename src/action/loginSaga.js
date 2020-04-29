import {call, put, take, fork, takeEvery} from 'redux-saga/effects';
import types from './const';
import LoginService from '../service/login';

// worker saga 
// 调用异步操作  call fork
// 状态更新 put
function* loginHandle(action) {
    yield put({
        type: types.REQUEST
    })
    try {
        const res1 = yield call(LoginService.login, action.payload);
        const res2 = yield call(LoginService.getMoreUserInfo, res1);
        yield put({type: types.LOGIN_SUCCESS, payload: res2})
    } catch(err) {
        yield put({
            type: types.LOGIN_FAILURE,
            payload: err
        })
    }
}

function* loginSaga(params){
    yield takeEvery(types.LOGIN_SAGA, loginHandle)

    // while (true) {
    //     const action = yield take(types.LOGIN_SAGA);
    //     yield call(loginHandle, action)
    // }
}

export default loginSaga;

// 自己实现takeEvery
// const takeEvery = (pattern, saga, ...args) =>
//     fork(function*() {
//         while (true) {
//             const action = yield (pattern);
//             yield fork(saga, ...args.concat(action))
//         }
//     })