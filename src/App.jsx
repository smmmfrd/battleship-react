import { useEffect, useState } from "react";

import GameBoard from "./gameboard";

import GridSquare from "./components/GridSquare";
import BoardDisplay from "./components/BoardDisplay";

// Board is always a square, so a board size of 6 is a 6x6.
const BOARD_SIZE = 6;

const SHIP_MARGIN = 4;

export default function App() {
  const [enemyBoard, setEnemyBoard] = useState(GameBoard(BOARD_SIZE));

  // TEMP - placing ships on a static board
  useEffect(() => {
    setEnemyBoard(() => {
      var newBoard = GameBoard(BOARD_SIZE);
      newBoard.addShip(0, 0, 2, false);
      newBoard.addShip(3, 0, 3, false);
      newBoard.addShip(0, 1, 5, true);
      newBoard.addShip(1, 1, 3, false);
      newBoard.addShip(2, 3, 4, false);
      return newBoard;
    });
  }, []);
  
  // TEMP - a peek into the enemy board.
  useEffect(() => {
    console.log(enemyBoard);
  }, [enemyBoard]);

  function handleSquareClick(position){
    // console.log("x:", position % BOARD_SIZE, "y: ", parseInt(position / BOARD_SIZE));
    setEnemyBoard(prevBoard => {
      var newBoard = {...prevBoard}
      newBoard.attacked(position);
      return newBoard;
    });
  }

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Time to Battle Ship!
      </h1>
      <BoardDisplay 
        boardSize={BOARD_SIZE}
        shipMargin={SHIP_MARGIN}
        shipData={enemyBoard.ships}
        boardData={enemyBoard.board}
        handleSquareClick={handleSquareClick}
      />
    </div>
  );
}