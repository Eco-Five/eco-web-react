import React, { useState, useReducer } from 'react'

const ACTION_TYPES = {
    deposit: 'deposit',
    withdraw: 'withdraw'
}

// action - 요구의 내용 -> dispatch의 인자로 넣습니다!
// reducer - state를 업데이트 하는 역할(은행)
const reducer = (state, action) => {
    console.log('reducer가 일을 합니다!', state, action)
    
    // return을 action의 payload를 통해 state값의 결과를 반환합니다.
    // 결과값은 money 변수에 할당됩니다.
    switch (action.type) {
        case ACTION_TYPES.deposit:
            return state + action.payload
        case ACTION_TYPES.withdraw:
            return state - action.payload
        default:
            return state
    }

}

const GameReducer = () => {
    const [number, setNumber] = useState(0)
    // dispatch - state 업데이트를 위한 요구함수로 useReducer에 의해 생성됩니다.
    const [money, dispatch] = useReducer(reducer, 0)

    return (
        <div>
            <h2>useReducer 은행에 오신 것을 환영합니다.</h2>
            <p>잔고: {money}원</p>
            <input
                type='number'
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
                step='1000'
            />
            <button onClick={() => {dispatch({ type: ACTION_TYPES.deposit, payload: number })}}>예금</button>
            <button onClick={() => {dispatch({ type: ACTION_TYPES.withdraw, payload: number })}}>출금</button>
        </div>
    )
}

export default GameReducer