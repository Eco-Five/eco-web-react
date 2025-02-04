import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNumber, minusOne, plusOne } from "../../redux/modules/counter";

const HoonRedux = () => {
  const dispatch = useDispatch()
  const number = useSelector((state) => state.counter.number)
  console.log(number);

  return (
    <div>
      {number}
      <button onClick={()=> {
        dispatch(plusOne())
      }}>
        쁠라스 원
      </button>
      <button onClick={()=>{
        dispatch(minusOne())
      }}>
        마이나뜨 원
      </button>
      <button onClick={() => {
        dispatch(addNumber(number))
      }}>
        고파기2
      </button>
    </div>
  )
};

export default HoonRedux;
