import React, { useState, useEffect } from 'react'
import Timer from './Timer'

const HoonEffect = () => {
    const [showTimer, setShowTimer] = useState(false)
    return (
        <div>
            {showTimer && <Timer />}
            <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
        </div>
    )
}

export default HoonEffect