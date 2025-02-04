import React from "react";
import HoonCallback from "./HoonCallback";
import HoonReducer from "./HoonReducer";
import HoonEffect from "./HoonEffect";
import HoonRef from "./HoonRef";
import HoonRef2 from "./HoonRef2";
import HoonMemo from "./HoonMemo";

const Hoon = () => {
  return (
    <>
      <div>훈게임에 오신걸 환영합니다!</div>
      <HoonCallback />
      <hr />
      <HoonReducer />
      <hr />
      <HoonEffect />
      <hr />
      <HoonRef />
      <hr />
      <HoonRef2 />
      <hr />
      <HoonMemo />
    </>
  )
};

export default Hoon;
