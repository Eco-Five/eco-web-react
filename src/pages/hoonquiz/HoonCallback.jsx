import React, { useEffect, useState, useCallback } from "react";

const HoonCallback = () => {
const [number, setNumber] = useState(0);
const [toggle, setToggle] = useState(true);

  useEffect(() => {
    console.log('트루일까요 뽈스일까요~');
  }, [toggle])

  const someFunction = useCallback(() => {
    console.log('someFunc: number: ' + number);
    return;
  },[number])
    

    useEffect(() => {
      console.log('someFunction이 변경!!!!');
    }, [someFunction])

  return (
    <div>
        <input 
          type="number" 
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          />
          <button onClick={() => setToggle(!toggle)}>{toggle.toString()}</button>
          <br></br>
          <button onClick={someFunction}>입력버른립리다</button>
          
    </div>
  )
};

export default HoonCallback;
