import { useEffect, useState } from "react";

import GameBoard from "../gameboard";

import BoardDisplay from "./BoardDisplay";

export default function EnemyBoard({ BOARD_SIZE, SHIP_MARGIN, SHIP_LENGTHS }) {
    const [enemyBoard, setEnemyBoard] = useState(GameBoard(BOARD_SIZE));

    // TEMP - placing ships on a static board
    useEffect(() => {
        setEnemyBoard(() => {
            var newBoard = GameBoard(BOARD_SIZE);
            buildEnemyBoard(newBoard);
            return newBoard;
        });
    }, []);

    function buildEnemyBoard(board) {
        var placements = [];
        for(let i = 0; i < BOARD_SIZE - 1; i++){
            placements.push(i + (i * BOARD_SIZE) + Math.floor(Math.random() * BOARD_SIZE));
        }
        placements.forEach(pos => board.attacked(pos));
    }

    function handleSquareClick(position) {
        setEnemyBoard(prevBoard => {
            var newBoard = { ...prevBoard }
            newBoard.attacked(position);
            return newBoard;
        });
    }

    return (
        <div className="enemy-board">
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