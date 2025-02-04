import React, { useState } from "react";

const HoonState = () => {
  const [text, setText] = useState({
    firstName: "",
    lastName: ""
  });
  //입력 요소의 내용이 변경되면 값을 저장
  const inputChanged=(event)=>{
    setText({...text,[event.target.name]:event.target.value});
  }
  const handleSubmit=(event)=>{
    alert(`당신의 성함은${text.firstName} ${text.lastName}입니다`);
    event.preventDefault();
    console.log(`성함:${text.firstName} ${text.lastName}`);
  }

  return (
    <>
    <h1>이름 생성기</h1>
    <form onSubmit={handleSubmit}>
      <label>성</label>
      <input type="text" name="firstName" value={text.firstName} onChange={inputChanged} />
      <br />
      <label>이름</label>
      <input type="text" name="lastName" value={text.lastName} onChange={inputChanged} />
      <input type="submit" value= "누르시오"/>
    </form>
    </>
  )
};

export default HoonState;
