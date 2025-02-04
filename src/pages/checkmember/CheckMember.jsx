import React, { useReducer, useState } from "react";
import Student from "./Student";
import Props from "./Props";
import HoonState from "./HoonState";


const reducer = (state, action) => {
  switch(action.type){
    case 'add=student':
      const name = action.payload.name
      const newStudent={
        id: Date.now(),
        name,
        isHere: false,
      }
      return {
        count: state.count + 1,
        students: [...state.students, newStudent]
      }
////////////////////////////////////
    case 'delete-student':
      return {
        count: state.count - 1,
        students: state.students.filter(student => student.id !== action.payload.id)
      }
////////////////////////////////////
    case 'mark-student':
      return {
        count: state.count,
        students: state.students.map(student=>{
          if(student.id === action.payload.id){
            return {...student, isHere: !student.isHere}
          }
        })
      }
//////////////////////////////////
      default:
      return state
  }
}
  

const initialState = {
  count : 0,
  students: []
}

const CheckMember = () => {
  const [name, setName] = useState("");
  const [studentInfo, dispatch] = useReducer(reducer, initialState)

  return  (
    <>
    <div>
      <h1>Death Note</h1>
      <p>Death Count: {studentInfo.count}</p>
      <input
        type="text" 
        placeholder="이름을 입력해"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <button onClick={()=>{
          dispatch({type: 'add=student', payload:{name}})
        }}>추가</button>
        {studentInfo.students.map(student =>{
          return (
          <Student 
          key={student.id} 
          name={student.name} 
          dispatch={dispatch} 
          id={student.id} 
          isHere={student.isHere}
          />)
        })}
    </div>
    <hr />
    <Props word="안녕" self="혼자서" react="리액트" do="하는 중"/>
    <hr />
    <HoonState/>
    </>
  )
};

export default CheckMember;
