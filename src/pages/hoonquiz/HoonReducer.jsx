import React, { useReducer, useState } from "react";

const ACTION_TYPES={
  deposit: 'deposit',
  withdraw: 'withdraw'
}

const reducer=(state, action)=>{
  console.log("reducer작동시작", state, action);
  
  switch(action.type){
    case ACTION_TYPES.deposit:
      return state + action.payload
    case ACTION_TYPES.withdraw:
      return state - action.payload
    default:
      return state
  }
}
const HoonReducer = () => {
  const [number , setNumber] = useState(0)
  const [money, dispatch] = useReducer(reducer, 0)
  return (
    <div>
      <h2>웰컴 훈 뱅크</h2>
      <p>잔고: {money}원</p>
      <input 
        type="number" 
        value={number}
        onChange={(e)=>setNumber(parseInt(e.target.value))}
        step='1500'
        />
        <button onClick={()=>{dispatch({ type: ACTION_TYPES.deposit, payload: number })}}>예금</button>
        <button onClick={()=>{dispatch({ type: ACTION_TYPES.withdraw , payload: number })}}>출금</button>
    </div>
  )
};

export default HoonReducer;
