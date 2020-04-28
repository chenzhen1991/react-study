import {call, put, takeEvery} from 'redux-saga/effects';
import types from './const';
import LoginService from '../service/login';

// worker saga 
// 调用异步操作  call
// 状态更新 put
function* loginHandle(action) {
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
}

export default loginSaga;