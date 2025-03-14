/************ Action Creator 생성 ***********/
const GET_USERINFO = 'GET_USERINFO'
const SET_USERINFO = 'SET_USERINFO'

export const getUserInfo = () => {
   return {
      type: GET_USERINFO
   }
}

export const setUserInfo = (payload) => {
   return {
      type: SET_USERINFO,
      payload
   }
}
/************ Action Creator 생성 ***********/


/***************** Reducer *****************/
const initialState = {
   userInfo: {},
}

const sessionInfo = (state = initialState, action) => {
   switch (action.type) {
      case GET_USERINFO:
         return {userInfo: state.userInfo}
      case SET_USERINFO:
         return {userInfo: action.payload}
      default:
         return state
   }
}
/***************** Reducer *****************/

export default sessionInfo