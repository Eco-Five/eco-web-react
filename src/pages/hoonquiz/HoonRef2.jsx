import React, { useEffect, useRef } from "react";

const HoonRef2 = () => {
  const inputRef= useRef('뭘봐')

  useEffect(() => {
    inputRef.current.focus()
  })
  
  const login = () => {
    alert(`로그인완료! ${inputRef.current.value}`)
  }
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="username" />
      <button onClick={login}>로그인</button>
    </div>
  )
};

export default HoonRef2;
