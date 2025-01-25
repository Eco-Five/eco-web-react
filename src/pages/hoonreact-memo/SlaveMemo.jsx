import React,{ memo } from "react";

const Slave = ({name}) => {
  console.log('노예는 영원한 노예');
  return (
    <div style={{ border: "2px solid black", padding: "10px" }}>
      <h3>노예</h3>
      <p>종: {name.firstName} </p>
      <p>인: {name.lastName} </p>
    </div>
  )
};

export default memo(Slave);
