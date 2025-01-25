import React from "react";

const Timer = () => {

  useEffect(()=>{
    //맨 처음 마운트 되었을 때만 실행됩니다
    const timers = setInterval(()=>{
      
      console.log("타이머 실행중");
    },1000)
    return ()=>{
      clearInterval(timers)
      console.log('타이머 종료완료');
    }
    },[])
  return (
    <div>
      <span>Timer start!!</span>
    </div>
  )
};

export default Timer;
