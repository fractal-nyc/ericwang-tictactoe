import { useState } from 'react'
import { move, initialGameState, GameState } from './game'
import './App.css'

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  const headerMessage = () => {
    if(gameState.state === 'won') return `${gameState.currentPlayer} won!`
    else if (gameState.state === 'tie') return `tie!`
    else return `${gameState.currentPlayer}'s turn`
  }

  return (
    <main className='flex flex-col gap-8'>
      <span className='text-6xl font-bold'>{headerMessage()}</span>
      <div className='grid grid-rows-3 grid-cols-3 gap-2'>
        {gameState.board.map((cell, index) => {
          return (
            <button 
              className='h-[200px] w-[200px] bg-gray-500 cursor-pointer hover:bg-gray-400'
              onClick={() => {
                const newGameState:GameState = move(gameState, index)
                setGameState(newGameState)
              }}
            >
              <span className='text-8xl font-bold'>
                {gameState.board[index]}
              </span>
            </button>
          )
        })}
      </div>
    </main>
  )
}

export default App
