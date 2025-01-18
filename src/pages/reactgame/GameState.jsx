import { useState } from "react"

const GameState = () => {
    const heavyWork = () => {
        console.log("엄청 무거운 작업!!!")
        return ['무거워', '무겁다고']
    }

    // useState
    const [names, setNames] = useState(() => {
        return heavyWork()
    })
    const [input, setInput] = useState("")

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleUpload = () => {
        setNames((prev) => {
            return([input, ...prev])
        })
    }

    console.log(input);

    return (
        <>
            <div>
                <p>input의 문자열을 출력해보세요!</p>
                <input type="text" value={input} onChange={handleInputChange}/>
                <button onClick={handleUpload}>Upload</button>
                {names.map((name, index) => {
                    return <p key={index}>{name}</p>
                })}
            </div>
        </>
    )
}

export default GameState