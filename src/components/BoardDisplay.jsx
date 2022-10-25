import { useContext } from "react";
import { GameContext } from "../gameContext";
import GridSquare from "./GridSquare";

const shipMargin = 4;

export default function BoardDisplay({ shipData = [], boardData = [], children, displayShips = true,
    handleSquareClick = () => {}, handleSquareEnter = () => {} }) {
    const {boardSize} = useContext(GameContext);
    
    function fillGrid() {
        var squares = [];
        for (let i = 0; i < boardSize * boardSize; i++) {
            
            squares.push(
                <GridSquare key={i} position={i}
                    handleClick={boardData[i] > 0 ? () => {} : handleSquareClick }
                    handleEnter={handleSquareEnter} />
            );
            switch (boardData[i]) {
                case 0:
                    break;
                case 1:
                    squares.push(
                        <div 
                        key={`${i} ${boardData[i]}`}
                        className="w-8 h-8 m-1 bg-slate-200 rounded-full absolute z-10 animate-fadeIn"
                        style={placeMarker(i)}
                        />
                    );
                    break;
                case 2:
                    squares.push(
                        <div 
                        key={`${i} ${boardData[i]}`}
                        className="w-8 h-8 m-1 bg-red-600 rounded-full absolute z-10 animate-fadeIn"
                        style={placeMarker(i)}
                        />
                    );
                    break;
                default:
                    console.error("Value not found: ", boardData[i]);
                    break;
            }
        }
        return squares;
    }

    function placeShip({x, y, length, vertical}) {
        var styles = {};

        const longSideLength = () => {
            return 40 * length + (length - 1) * 4;
        }

        const getPosition = (val) => {
            return (val * 44) + 4;
        }

        styles.width = `${(vertical ? 40 : longSideLength()) - shipMargin * 2}px`;
        styles.height = `${(vertical ? longSideLength() : 40) - shipMargin * 2}px`;
        styles.left = `${getPosition(x) + shipMargin}px`;
        styles.top = `${getPosition(y) + shipMargin}px`;
        return styles;
    }

    function placeMarker(position) {
        var styles = {};
        var [x, y] = [position % boardSize, parseInt(position / boardSize)];
        x = (x * 44) + 4;
        y = (y * 44) + 4;
        styles.left = `${x}px`;
        styles.top = `${y}px`;
        return styles;
    }

    function boardElement(){
        switch(boardSize.toString()) {
            case "6":
                return <div className="grid gap-1 grid-cols-6 grid-rows-6">
                    {boardData.length > 0 && fillGrid()}
                </div>;
            case "8":
                return <div className="grid gap-1 grid-cols-8 grid-rows-8">
                    {boardData.length > 0 && fillGrid()}
                </div>;
            case "10":
                return <div className="grid gap-1 grid-cols-10 grid-rows-10">
                    {boardData.length > 0 && fillGrid()}
                </div>;
            case "12":
                return <div className="grid gap-1 grid-cols-12 grid-rows-12">
                    {boardData.length > 0 && fillGrid()}
                </div>;
        }
    }

    const shipElements = shipData.map((ship, index) => {
        var shipName = `${ship.length} ${index}`;
        return <div
            key={shipName}
            className='absolute bg-slate-500 rounded-3xl pointer-events-none' 
            style={placeShip(ship)}
        />
    });

    return (
        <div className="w-max h-max mx-auto mt-4 relative
        border rounded-sm p-1 bg-slate-200 border-slate-200">
            {boardElement()}
            {shipData.length > 0 && displayShips && shipElements}
            {children}
        </div>
    );
}

BoardDisplay.default