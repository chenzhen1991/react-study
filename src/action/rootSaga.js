import {all} from 'redux-saga/effects';
import loginSga from './loginSaga';

export default function *rootSaga() {
    yield all([loginSga()])
}