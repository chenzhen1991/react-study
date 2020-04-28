import types from './const';
import LoginService from '../service/login'

export const logout = () => ({type: types.LOGOUT_SUCCESS });

// 同步
// export const login = (userInfo) => ({type: types.LOGIN_SUCCESS, payload: userInfo})

//  异步调取
export const login = userInfo => dispatch => {
    LoginService.login(userInfo).then(
        res => {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: res
            })
            LoginService.getMoreUserInfo(res).then(
                res => {
                    console.log(res)
                    dispatch({
                        type: types.GET_SCORE,
                        payload: res
                    })
                },
                err => {
                    dispatch({
                        type: types.GET_SCORE_FAILURE,
                        payload: err
                    })
                }
            )
        },
        err => {
            dispatch({
                type: types.LOGIN_FAILURE,
                payload: err
            })
        }
    )
}
