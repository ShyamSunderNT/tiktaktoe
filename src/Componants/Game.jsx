import React, { useReducer, useRef } from 'react';
import './Game.css';

const initialState = {
  board: Array(9).fill(null),
  xIsNext: true,
  winner: null,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'MOVE':
      if (state.winner || state.board[action.index]) return state;
      const newBoard = state.board.slice();
      newBoard[action.index] = state.xIsNext ? 'X' : 'O';
      return {
        ...state,
        board: newBoard,
        xIsNext: !state.xIsNext,
        winner: calculateWinner(newBoard),
      };
    case 'RESET':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const boardRef = useRef(null);

  function handleClick(index) {
    dispatch({ type: 'MOVE', index });
  }

  function renderSquare(index) {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {state.board[index]}
      </button>
    );
  }

  return (
    <div className="game" ref={boardRef}>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>
          {state.winner
            ? 'Winner: ' + state.winner
            : 'Next player: ' + (state.xIsNext ? 'X' : 'O')}
        </div>
        <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </div>
    </div>
  );
}

export default Game;
