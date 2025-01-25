import React, { useMemo, useState } from "react";
import SlaveMemo from "./SlaveMemo";

const RmMemo = () => {
  const [noblessAGE, setNoblessAge] = useState(50);

  const incrementNoblessAge = () => {
    setNoblessAge(noblessAGE + 1);
  };

  console.log("귀족 신분 쌍씅!!!!!");

  const name = useMemo(() => {
    return { firstName: "백", lastName: "인" };
  }, []);

  return (
    <div style={{ border: "2px solid navy", padding: "10px" }}>
      <h1>귀족</h1>
      <p>계급:{noblessAGE}</p>
      <button onClick={incrementNoblessAge}>귀족 신분 상승</button>
      <SlaveMemo name={name} />
    </div>
  );
};

export default RmMemo;
