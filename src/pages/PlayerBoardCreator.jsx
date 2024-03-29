import { useState, useRef, useEffect, useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../gameContext";
import BoardDisplay from "../components/BoardDisplay";
import GameBoard from "../gameboard";

export default function PlayerBoardCreator() {
    var shipLengthIndex = useRef(0);
    const { setPlayerBoard: setContextBoard, setEnemyBoard, boardSize, shipLengths, fromOptions, setFromOptions } = useContext(GameContext);

    const [playerBoard, setPlayerBoard] = useState(GameBoard(boardSize));
    const [currentPosition, setCurrentPosition] = useState(0);
    const [shipStats, setShipStats] = useState({
        length: shipLengths[shipLengthIndex.current],
        vertical: false
    });
    const shipPlacer = useRef();

    const navigate = useNavigate();
    // Initiliazing check to make sure the player came from the options menu
    useEffect(() => {
        if (!fromOptions) {
            navigate('/');
        }
    },[])

    const handleKeyPress = useCallback(event => {
        // If the player pressed "R"
        if (event.keyCode === 82) {
            var vertical = !shipStats.vertical
            setShipStats(prevShip => ({ ...prevShip, vertical: vertical }));
            handleEnter(currentPosition, vertical);
        }
    }, [shipStats, currentPosition]);

    // Set up rotate input on mount
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        }
    }, [handleKeyPress]);

    // Handle placing ship's size
    useEffect(() => {
        const longSideLength = () => {
            return 40 * shipStats.length + (shipStats.length - 1) * 4;
        }

        shipPlacer.current.style.width = `${(shipStats.vertical ? 40 : longSideLength())}px`;
        shipPlacer.current.style.height = `${(shipStats.vertical ? longSideLength() : 40)}px`;
    }, [shipStats]);

    function handleClick(position) {
        // Escape condition
        if (shipLengthIndex.current >= shipLengths.length) { return; }

        if (playerBoard.goodPosition(position, shipStats.length, shipStats.vertical)) {
            // Convert array index (position) to 2D coordinates
            var [x, y] = [position % boardSize, parseInt(position / boardSize)];
            // Update the board
            setPlayerBoard(prevBoard => {
                var newBoard = { ...prevBoard };
                newBoard.addShip(x, y, shipStats.length, shipStats.vertical);
                return newBoard;
            });
            // Force the placer to be invalid
            shipPlacerValidPosition(false);

            // Go to the next index
            shipLengthIndex.current++;

            // Get our next length
            if (shipLengthIndex.current < shipLengths.length) {
                setShipStats(prevStats => ({ ...prevStats, length: shipLengths[shipLengthIndex.current] }));
            } else {
                // Ships are all placed.
                shipPlacer.current.style.display = "none";
            }
        }
    }

    function handleEnter(position, vertical = shipStats.vertical) {
        // Escape condition
        if (shipLengthIndex.current >= shipLengths.length) { return; }

        var [x, y] = [position % boardSize, parseInt(position / boardSize)];
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
        if (valid) {
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

    function getShipName(index) {
        switch (index) {
            case 0: return "Destroyer";
            case 1: return "Submarine";
            case 2: return "Cruiser";
            case 3: return "Battleship";
            case 4: return "Carrier";
        }
    }

    return (
        <>
            <header className="text-center">
                <h1 className="text-3xl font-bold underline">
                    Build Your Board!
                </h1>
                <p className="text-sm text-neutral-700">
                    (Press R to rotate)
                </p>
            </header>
            <main>
                {shipLengthIndex.current >= shipLengths.length ?
                    <Link to="/game" className="block mt-4 mx-auto bg-blue-600 text-neutral-50 w-max px-2 py-1 rounded-xl text-center hover:underline" onClick={() => {
                        setContextBoard(playerBoard);
                        // Clearing out any old data on the enemy board here.
                        setEnemyBoard(GameBoard(boardSize));
                        
                        setFromOptions(false);
                    }}>
                        Start Game
                    </Link>
                    :
                    <p className="text-center">
                        Current Ship: {getShipName(shipLengthIndex.current)} ({shipLengths[shipLengthIndex.current]})
                    </p>
                }
                <BoardDisplay
                    shipData={playerBoard.ships}
                    boardData={playerBoard.board}
                    handleSquareClick={handleClick}
                    handleSquareEnter={handleEnter}
                >
                    <div ref={shipPlacer} className="border-2
                    absolute pointer-events-none hidden"/>
                </BoardDisplay>
            </main>
        </>
    );
}