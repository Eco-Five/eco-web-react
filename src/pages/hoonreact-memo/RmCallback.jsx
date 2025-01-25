import React, { useCallback, useState } from "react";
import SlaveCallback from "./SlaveCallback";

const RmCallback = () => {
  const [noblessAGE, setNoblessAge] = useState(50);

  const incrementNoblessAge = () => {
    setNoblessAge(noblessAGE + 1);
  };

  console.log("귀족 신분 쌍씅!!!!!");

  const tellMe = useCallback(()=>{
    console.log('노예야 밥먹자');
  },[])

  return (
    <div style={{ border: "2px solid navy", padding: "10px" }}>
      <h1>귀족</h1>
      <p>계급:{noblessAGE}</p>
      <button onClick={incrementNoblessAge}>귀족 신분 상승</button>
      <SlaveCallback name={"백인"} tellMe={tellMe} />
    </div>
  );
};

export default RmCallback;
