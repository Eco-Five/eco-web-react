import React, { useEffect, useRef, useState } from 'react'

const GameRef = () => {
    const [count, setCount] = useState(1)
    const renderCount = useRef(1)

    useEffect(() => {
        renderCount.current += 1
        console.log("렌더링 수:", renderCount.current)
    })

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>올려</button>
        </div>
    )
}

export default GameRef