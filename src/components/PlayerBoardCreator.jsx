import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import BoardDisplay from "./BoardDisplay";
import GameBoard from "../gameboard";

export default function PlayerBoardCreator({BOARD_SIZE, SHIP_MARGIN}) {
    const [playerBoard, setPlayerBoard] = useState(GameBoard(BOARD_SIZE));
    const shipPlacer = useRef();

    function handleClick(position) {
        console.log(position);
    }

    function handleEnter(position) {
        var [x, y] = [position % BOARD_SIZE, parseInt(position / BOARD_SIZE)];
        x = (x * 36) + 4;
        y = (y * 36) + 4;
        shipPlacer.current.style.left = `${x}px`;
        shipPlacer.current.style.top = `${y}px`;
        shipPlacer.current.style.display = 'block';
    }

    function handleLeave(position) {
        shipPlacer.current.style.display = 'none';
    }

    return (
        <div className="enemy-board">
            <h1 className="text-3xl font-bold underline">
                Time to Build Your Board!
            </h1>
            <BoardDisplay
                boardSize={BOARD_SIZE}
                shipMargin={SHIP_MARGIN}
                shipData={playerBoard.ships}
                boardData={playerBoard.board}
                handleSquareClick={handleClick}
                handleSquareEnter={handleEnter}
                handleSquareLeave={handleLeave}
            >
                <div ref={shipPlacer} className="w-8 h-8 bg-gray-500 border-2
                border-gray-800 absolute pointer-events-none"/>
            </BoardDisplay>
            <Link to="/game">Start Game</Link>
        </div>
    );
}