/************** Action Creator 생성 *************/
// Action Creator를 생성하는 이유는 자동완성을 통해 휴먼에러를 방지하고,
// 유지보수 효율성과 가독성을 높이기 위해 사용합니다.
const PLUS = 'PLUS'
const MINUS = 'MINUS'
const ADD_NUMBER = 'ADD_NUMBER'

export const plusOne = () => {
   return {
      type: PLUS,
   }
}

export const minusOne = () => {
   return {
      type: MINUS,
   }
}

export const addNumber = (payload) => {
   return {
      type: ADD_NUMBER,
      payload
      // payload: payload // 키와 value가 같으면 1개만 적어도 된다.
   }
}
/************** Action Creator 관리 *************/


/***************** Reducer *****************/
// 초기 상태값
const initialState = {
   number: 0
}

// Reducer
// Reducer는 변화를 일으키는 함수입니다.
// Reducer(모듈)은 만들면 store에 연결해야 합니다.
// counter(Reducer)는 dispatch()를 통해 호출되며,
// dispatch(action)의 action 객체는 counter의 action 인자에 할당됩니다.
// 위에 생성해둔 action 객체의 타입에 따라서 counter는 결과값을 return 합니다.
const counter = (state = initialState, action) => {
   switch (action.type) {
      case PLUS:
         return {number: state.number + 1}
      case MINUS:
         return {number: state.number - 1}
      case ADD_NUMBER:
         return {number: state.number + action.payload}
      default:
         return state
   }
}
/***************** Reducer *****************/

export default counter