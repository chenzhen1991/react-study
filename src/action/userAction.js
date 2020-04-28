import types from './const';
// import LoginService from '../service/login'

export const logout = () => ({type: types.LOGOUT_SUCCESS });

// saga 
export const login = (userInfo) => ({type: types.LOGIN_SAGA, payload: userInfo})

// 同步
// export const login = (userInfo) => ({type: types.LOGIN_SUCCESS, payload: userInfo})

//  异步调取 普通写法
// export const login = userInfo => dispatch => {
//     LoginService.login(userInfo).then(
//         res => {
//             dispatch({
//                 type: types.LOGIN_SUCCESS,
//                 payload: res
//             })
//             LoginService.getMoreUserInfo(res).then(
//                 res => {
//                     console.log(res)
//                     dispatch({
//                         type: types.GET_SCORE,
//                         payload: res
//                     })
//                 },
//                 err => {
//                     dispatch({
//                         type: types.GET_SCORE_FAILURE,
//                         payload: err
//                     })
//                 }
//             )
//         },
//         err => {
//             dispatch({
//                 type: types.LOGIN_FAILURE,
//                 payload: err
//             })
//         }
//     )
// }

// async  await 的写法
// export function login(userInfo) {
//     return async function(dispatch) {
//         dispatch({
//             type: types.REQUEST
//         })

//         let res1 = await loginPromise(dispatch,userInfo)
//         console.log(res1);
        
//         if(res1) {
//             console.log(222);
            
//             loginMore(dispatch,res1)
//         }
//     }
// }

// export const loginPromise = (dispatch, userInfo) => {
//     return LoginService.login(userInfo).then(
//         res => {
//             // dispatch({
//             //     type: types.LOGIN_SUCCESS,
//             //     payload: res
//             // })

//             return res;
//         },
//         err => {
//             dispatch({
//                 type: types.LOGIN_FAILURE,
//                 payload: err
//             })
//         }
//     );
// }

// export const loginMore = (dispatch, userInfo) => {
//     return LoginService.getMoreUserInfo(userInfo).then(
//         res => {
//             dispatch({
//                 type: types.LOGIN_SUCCESS,
//                 payload: res
//             })
//         },
//         err => {
//             dispatch({
//                 type: types.LOGIN_FAILURE,
//                 payload: err
//             })
//         }
//     );
// }
