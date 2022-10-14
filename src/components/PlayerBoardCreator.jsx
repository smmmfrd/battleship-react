import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import BoardDisplay from "./BoardDisplay";
import GameBoard from "../gameboard";

export default function PlayerBoardCreator({BOARD_SIZE, SHIP_MARGIN, SHIP_LENGTHS, boardFinished}) {
    var shipLengthIndex = useRef(0);
    
    const [playerBoard, setPlayerBoard] = useState(GameBoard(BOARD_SIZE));
    const [shipStats, setShipStats] = useState(
        {
            length: SHIP_LENGTHS[shipLengthIndex.current], 
            vertical: false
        });
    const [currentPosition, setCurrentPosition] = useState(0);
    const shipPlacer = useRef();

    const handleKeyPress = useCallback(event => {
        if(event.keyCode === 82) {
            var vertical = !shipStats.vertical
            setShipStats(prevShip => ({...prevShip, vertical: vertical}));
            handleEnter(currentPosition, vertical);
        }
    }, [shipStats, currentPosition]);

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
        if(shipLengthIndex.current >= SHIP_LENGTHS.length){return;}

        if(playerBoard.goodPosition(position, shipStats.length, shipStats.vertical)){
            var [x, y] = [position % BOARD_SIZE, parseInt(position / BOARD_SIZE)];
            setPlayerBoard(prevBoard => {
                var newBoard = {...prevBoard};
                newBoard.addShip(x, y, shipStats.length, shipStats.vertical);
                return newBoard;
            });
            shipPlacerValidPosition(false);

            shipLengthIndex.current++;
            
            if(shipLengthIndex.current < SHIP_LENGTHS.length){
                setShipStats(prevStats => ({...prevStats, length: SHIP_LENGTHS[shipLengthIndex.current]}));
            } else {
                // Ships are all placed.
                shipPlacer.current.style.display = "none";
            }
        }
    }

    function handleEnter(position, vertical = shipStats.vertical) {
        if(shipLengthIndex.current >= SHIP_LENGTHS.length){return;}

        var [x, y] = [position % BOARD_SIZE, parseInt(position / BOARD_SIZE)];
        x = (x * 44) + 4;
        y = (y * 44) + 4;
        shipPlacer.current.style.left = `${x}px`;
        shipPlacer.current.style.top = `${y}px`;
        shipPlacer.current.style.display = 'block';

        var valid = playerBoard.goodPosition(position, shipStats.length, vertical);
        shipPlacerValidPosition(valid);
        setCurrentPosition(position);
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
            {shipLengthIndex.current >= SHIP_LENGTHS.length && 
                <Link onClick={() => boardFinished(playerBoard)} to="/game">Start Game</Link>}
        </div>
    );
}