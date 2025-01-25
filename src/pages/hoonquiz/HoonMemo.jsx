import React, { useEffect, useMemo, useState } from "react";

const HoonMemo = () => {
  const [number, setNumber] = useState(0)
  const [isUSA, setIsUSA] = useState(true)

  const location= useMemo(()=>{
    return {
      country: isUSA ? '미국' : '일본'
    }
  },[isUSA])

  useEffect(()=>{
    console.log("일단 한국은 뜨자");    
  },[location])

  return (
  <div>
    <h4>햄최몇?</h4>
    <input 
      type="number" 
      value={number}
      onChange={(e) => setNumber(e.target.value)}
    />
    <h4>이민 어디로 갈래?</h4>
    <p>나라 : {location.country}</p>
    <button onClick={() => setIsUSA(!isUSA)}>짐싸</button>
  </div>
  )
};

export default HoonMemo;
