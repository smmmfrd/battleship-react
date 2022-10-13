import { useEffect, useState } from "react";

import GameBoard from "../gameboard";

import BoardDisplay from "./BoardDisplay";

export default function EnemyBoard({ BOARD_SIZE, SHIP_MARGIN }) {
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

    function handleSquareClick(position) {
        setEnemyBoard(prevBoard => {
            var newBoard = { ...prevBoard }
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