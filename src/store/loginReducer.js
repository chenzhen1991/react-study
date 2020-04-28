import types from '../action/const';

const userInfo = {
    isLogin: false,
    userInfo: {id: null, name: "", score: 0},
    loading:false,
    err:{msg: ''}
};
// {type, payload}  ===> action
export const loginReducer =  (state={...userInfo}, {type, payload}) => {
    switch (type) {
        case types.REQUEST:
            return {...state, loading: true};
        case types.LOGIN_SUCCESS:
            console.log('进来',{...payload})
            return {...state, isLogin: true, loading: false, userInfo: {...payload}};
        case types.LOGIN_FAILURE:
            return {...state, ...userInfo, ...payload};
        case types.LOGOUT_SUCCESS:
            return {...state, ...userInfo};
        case types.GET_SCORE:
            return {...state, isLogin: true, loading: false, userInfo: {...payload}};
        case types.GET_SCORE_FAILURE:
            return {...state, isLogin: true, loading: false, userInfo: {...payload}}
        default:
            return state;
    }
}