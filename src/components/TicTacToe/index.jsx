import { useState } from 'react'
import Square from '@components/Square'
import '@styles/tictactoe.css'

const Board = () => {
  const [square, setSquare] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(true)
  const [winner, setWinner] = useState(null)

  const calculateWinner = newSquare => {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i]
      if (
        newSquare[a] &&
        newSquare[a] == newSquare[b] &&
        newSquare[b] == newSquare[c]
      ) {
        const newWinner = turn ? 'X' : 'O'
        return newWinner
      }
    }
  }

  const restoreGame = () => {
    setSquare(Array(9).fill(null))
    setTurn(true)
    setWinner(null)
  }

  const onHandleClick = i => {
    const newSquare = square.slice()
    if (turn) {
      newSquare[i] = 'X'
    } else {
      newSquare[i] = 'O'
    }
    setSquare(newSquare)
    const winningPlayer = calculateWinner(newSquare)
    if (winningPlayer) {
      setWinner(winningPlayer)
    } else {
      setTurn(!turn)
    }
  }

  return (
    <>
      <h1>TIK TAK TOE</h1>
      <div className="board">
        {[0, 3, 6].map((row, index) => (
          <div key={`row-${index}`} className="board-row">
            {[0, 1, 2].map(pos => {
              const newPos = row + pos
              return (
                <Square
                  key={newPos}
                  disabled={square[newPos] || winner}
                  value={square[newPos]}
                  onSquareClick={() => onHandleClick(newPos)}
                />
              )
            })}
          </div>
        ))}
      </div>
      {}
      {winner && <h2>the winner is {winner}</h2>}
      {square.every(ele => ele !== null) && !winner && <h2>Draw game</h2>}
      {(winner || (square.every(ele => ele !== null) && !winner)) && (
        <button onClick={restoreGame}>volver a jugar</button>
      )}
    </>
  )
}

export default Board
