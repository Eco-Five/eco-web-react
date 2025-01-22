import React, { useEffect, useMemo, useState } from 'react'

const GameMemo = () => {
    const [number, setNumber] = useState(0)
    const [isKorea, setIsKorea] = useState(true)

    // useMemo를 사용하면 State 상태값이 변경되더라도
    // isKorea가 변경될 때만 함수가 호출이 됩니다.
    const location = useMemo(() => {
        return {
            country: isKorea ? '한국' : '외국'
        }
    }, [isKorea])

    // location이 객체 타입이므로 렌더링 시, 주소값이 변경되면
    // useEffect가 동작하게 됩니다.
    useEffect(() => {
        console.log('useEffect 호출')
    }, [location])

    return (
        <div>
            <h4>하루에 몇끼 먹어요?</h4>
            <input 
                type="number" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)}
            />
            <h4>어느 나라에 있어요?</h4>
            <p>나라: {location.country}</p>
            <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
        </div>
    )
}

export default GameMemo