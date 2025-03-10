import React from "react"

export default function GameEnd({restartGame}) {
    return(
        <div className = "game-end-container">
            <div className = "game-end-label">All cards matched!</div>
            <button className = "game-end-button" onClick = {restartGame}>Play again</button>
        </div>
    )
}