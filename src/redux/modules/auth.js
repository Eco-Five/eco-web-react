const SET_AUTH = "SET_AUTH" 
const DELETE_AUTH = "DELETE_AUTH"

export const setAuth = (payload) => {
  return {type:'SET_AUTH', payload: payload}
}


export const deleteAuth = (payload) => {
  return {type:'DELETE_AUTH', payload: payload}
}




/****************************************************/

const initialState = {
  isVisible: false
}


// action = (type, payload)
// action = (명령어, 값)
const auth = (state = initialState, action ) =>{
  switch(action.type){
    case SET_AUTH :
      return {isVisible : action.payload}
    case DELETE_AUTH :
      return {isVisible : action.payload}
    default:
      return state
  }
}

export default auth