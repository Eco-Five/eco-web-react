import React, { useEffect } from 'react'

const Timers = (props) => {
    
    useEffect(() => {
        // 맨 처음 마운트 되었을 때만 실행됩니다.
        const timers = setInterval(() => {
            console.log('타이머 돌아가는 중...');
        }, 1000)

        // return은 컴포넌트가 언마운트 될 때 실행됩니다.
        return () => {
            clearInterval(timers)
            console.log('타이머가 종료되었습니다.');
        }
    }, [])

    return (
        <div>
            <span>타이머를 시작합니다. 콘솔을 보세요!</span>
        </div>
    )
}

export default Timers