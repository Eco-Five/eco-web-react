import React, { useState, useEffect } from 'react'
import Timers from './Timers'

const GameEffect = () => {
    const [showTimer, setShowTimer] = useState(false)

    return (
        <div>
            {showTimer && <Timers />}
            <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
        </div>
    )
}

export default GameEffect