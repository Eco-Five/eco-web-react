import React from 'react'
import GameState from './GameState'
import GameEffect from './GameEffect'

const Game = () => {
    return (
        <>
            <div>안녕하세요! 시크릿 게임에 오신 것을 환경합니다!</div>
            <GameState />
            <hr />
            <GameEffect />
            <hr />
            <GameRef />
        </>
    )
}

export default Game