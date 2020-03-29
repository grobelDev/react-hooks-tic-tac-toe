import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameResult, setGameResult] = useState();

  useEffect(() => {
    console.log(gameState);

    // Returns TRUE if there are no more NULL elements in gameState
    let isDraw = !gameState.some(element => {
      return element === null;
    });

    let victor = calculateWinner(gameState);
    if (victor) {
      setGameResult(`${victor} has won!`);
      console.log(`${victor} has won!`);
    } else if (isDraw) {
      setGameResult('Game is a draw!');
      console.log('Game is a draw!');
    }
  }, [gameState]);

  function calculateWinner(gameState) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          if (!gameResult) {
            if (!value) {
              if (xIsNext) {
                gameStateCopy[index] = 'X';
              } else {
                gameStateCopy[index] = 'O';
              }
              setXIsNext(!xIsNext);
              setGameState(gameStateCopy);
            }
          }
        }}
      >
        {value}
      </button>
    );
  }

  function ResetButton() {
    return (
      <button
        onClick={() => {
          let initialState = Array(9).fill(null);
          setGameState(initialState);
          setGameResult();
        }}
      >
        Reset Button
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
        <div>
          <ResetButton></ResetButton>
        </div>
        <div>{gameResult}</div>
      </header>
    </div>
  );
}

export default App;
