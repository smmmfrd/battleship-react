import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import BoardDisplay from "./BoardDisplay";
import GameBoard from "../gameboard";

export default function PlayerBoardCreator({BOARD_SIZE, SHIP_MARGIN}) {
    const [playerBoard, setPlayerBoard] = useState(GameBoard(BOARD_SIZE));
    const [shipStats, setShipStats] = useState({length: 3, vertical: false});
    const shipPlacer = useRef();

    const handleKeyPress = useCallback(event => {
        if(event.keyCode === 82) {
            setShipStats(prevShip => ({...prevShip, vertical: !prevShip.vertical}));
        }
    }, []);

    // TEMP - setting up some ships for placement
    useEffect(() => {
        setPlayerBoard(() => {
            var newBoard = GameBoard(BOARD_SIZE);
            newBoard.addShip(0, 0, 3, false);
            return newBoard;
        })
    },[])

    // Set up rotate input
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        }
    }, [handleKeyPress]);

    useEffect(() => {
        const longSideLength = () => {
            return 40 * shipStats.length + (shipStats.length - 1) * 4;
        }

        shipPlacer.current.style.width = `${(shipStats.vertical ? 40 : longSideLength())}px`;
        shipPlacer.current.style.height = `${(shipStats.vertical ? longSideLength() : 40)}px`;
    }, [shipStats]);

    function handleClick(position) {
        if(playerBoard.goodPosition(position, shipStats.length, shipStats.vertical)){
            var [x, y] = [position % BOARD_SIZE, parseInt(position / BOARD_SIZE)];
            setPlayerBoard(prevBoard => {
                var newBoard = {...prevBoard};
                newBoard.addShip(x, y, shipStats.length, shipStats.vertical);
                return newBoard;
            });
            shipPlacerValidPosition(false);
        }
    }

    function handleEnter(position) {
        var [x, y] = [position % BOARD_SIZE, parseInt(position / BOARD_SIZE)];
        x = (x * 44) + 4;
        y = (y * 44) + 4;
        shipPlacer.current.style.left = `${x}px`;
        shipPlacer.current.style.top = `${y}px`;
        shipPlacer.current.style.display = 'block';

        var valid = playerBoard.goodPosition(position, shipStats.length, shipStats.vertical);
        shipPlacerValidPosition(valid);
    }

    function shipPlacerValidPosition(valid) {
        if(valid) {
            shipPlacer.current.classList.add("bg-gray-500");
            shipPlacer.current.classList.add("border-gray-800");
            shipPlacer.current.classList.remove("bg-red-500");
            shipPlacer.current.classList.remove("border-red-800");
            shipPlacer.current.style.opacity = "100%";
        } else {
            shipPlacer.current.classList.add("bg-red-500");
            shipPlacer.current.classList.add("border-red-800");
            shipPlacer.current.style.opacity = "50%";
            shipPlacer.current.classList.remove("bg-gray-500");
            shipPlacer.current.classList.remove("border-gray-800");
        }
    }

    return (
        <div className="player-board">
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
            >
                <div ref={shipPlacer} className="border-2
                absolute pointer-events-none hidden"/>
            </BoardDisplay>
            <Link to="/game">Start Game</Link>
        </div>
    );
}