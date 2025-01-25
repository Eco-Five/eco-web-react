import React,{ memo } from "react";

const Slave = ({name, tellMe}) => {
  console.log('노예는 영원한 노예');
  return (
    <div style={{ border: "2px solid black", padding: "10px" }}>
      <h3>노예</h3>
      <p>인종: {name} </p>
      <button onClick={tellMe}>주인님...일 다했습니다(...꼬르륵)</button>
    </div>
  )
};

export default memo(Slave);
