import React, { useEffect, useRef, useState } from "react";

const HoonRef = () => {
  const [count, setCount] = useState(1)
  const renderCount = useRef(1)
  
  
  
  
  
  const increaseCountState = () => {
    setCount(count + 1)
  };
  
  const increaseCountRef = () => {
    renderCount.current = renderCount.current + 1
    console.log(renderCount.current);
  };
  return (
    <div>
      <p>count: {count}</p>
      <p>Ref : {renderCount.current}</p>
      <button onClick={increaseCountState}></button>
      <button onClick={increaseCountRef}></button>
    </div>
  )
};

export default HoonRef;
