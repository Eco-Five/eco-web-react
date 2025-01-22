import React from 'react'

// useSelector(): Redux 스토어에서 상태를 조회합니다.
// usetDispatch(): Redux 스토어에 action을 전달합니다.
import { useSelector, useDispatch } from 'react-redux'
import { plusOne, minusOne, addNumber } from '../../redux/modules/counter'

const GameRedux = () => {
   const dispatch = useDispatch()
   const number = useSelector((state) => state.counter.number)
   console.log(number)

   return (
      <div>
         {number}
         <button onClick={() => {
            // dispatch를 통해서 key값을 reducer에 보냅니다.
            // action객체는 반드시 type이라는 key가 있어야 합니다.
            // 요청 type에 따라서 reducer가 동작합니다.(switch문)
            dispatch(plusOne())
         }}>
            +1
         </button>
         <button onClick={() => {
            dispatch(minusOne())
         }}>
            -1
         </button>
         <button onClick={() => {
            dispatch(addNumber(number))
         }}>
            addNum
         </button>
      </div>
   )
}

export default GameRedux