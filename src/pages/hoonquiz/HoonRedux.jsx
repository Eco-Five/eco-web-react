import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNumber, minusOne, plusOne } from "../../redux/modules/counter";

const HoonRedux = () => {
  const dispatch = useDispatch();
  const number = useSelector((state)=> state.counter.number)
  console.log(number);
  
  return (
    <div>
      {number}
      <button onClick={()=>{
        dispatch(plusOne())
      }}>
        +1
      </button>
      <button onClick={()=>{
        dispatch(minusOne())
      }}>
        -1
      </button>
      <button onClick={()=>{
        dispatch(addNumber(number))
      }}>
        X2
      </button>
    </div>
  )
};

export default HoonRedux;
