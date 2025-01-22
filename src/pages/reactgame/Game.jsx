import React from 'react'
import GameState from './GameState'
import GameEffect from './GameEffect'
import GameRef from './GameRef'
import GameRef2 from './GameRef2'
import GameMemo from './GameMemo'
import GameCallback from './GameCallback'
import GameReducer from './GameReducer'
import GameRedux from './GameRedux'

const Game = () => {
    return (
        <>
            <div>안녕하세요! 시크릿 게임에 오신 것을 환경합니다!</div>
            <GameState />
            <hr />
            <GameEffect />
            <hr />
            <GameRef />
            <hr />
            <GameRef2 />
            <hr />
            <GameMemo />
            <hr />
            <GameCallback />
            <hr />
            <GameReducer />
            <hr />
            <GameRedux />
        </>
    )
}

export default Game