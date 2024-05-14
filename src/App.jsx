import React from 'react';
import Game from './Componants/Game';
import './App.css';
import "./Componants/Game.css"

const App = () => {
  return (
   <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
      </header>
      <Game/>
    </div>
  );
};

export default App;