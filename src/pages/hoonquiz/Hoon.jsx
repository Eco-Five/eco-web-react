import React from "react";
import HoonCallback from "./HoonCallback";
import HoonReducer from "./HoonReducer";

const Hoon = () => {
  return (
    <>
      <div>훈게임에 오신걸 환영합니다!</div>
      <HoonCallback />
      <hr />
      <HoonReducer />
    </>
  )
};

export default Hoon;
