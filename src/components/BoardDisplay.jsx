import GridSquare from "./GridSquare";

export default function BoardDisplay({ boardSize, shipMargin, shipData, boardData, handleSquareClick }) {

    var ships = shipData;

    function fillGrid() {
        var squares = [];
        for (let i = 0; i < boardSize * boardSize; i++) {
            // console.log(boardData[i]);
            squares.push(
                <GridSquare key={i} handleClick={handleSquareClick} position={i}/>
            );
            switch (boardData[i]) {
                case 0:
                    break;
                case 1:
                    console.log("missed here");
                    break;
                case 2:
                    console.log("hit here");
                    break;
                default:
                    console.log("Value not found: ", boardData[i]);
                    break;
            }
        }
        return squares;
    }

    function placeShip({x, y, length, vertical}) {
        var styles = {};

        const longSideLength = () => {
            return 32 * length + (length - 1) * 4;
        }

        const getPosition = (val) => {
            return (val * 36) + 4;
        }

        styles.width = `${(vertical ? 32 : longSideLength()) - shipMargin * 2}px`;
        styles.height = `${(vertical ? longSideLength() : 32) - shipMargin * 2}px`;
        styles.left = `${getPosition(x) + shipMargin}px`;
        styles.top = `${getPosition(y) + shipMargin}px`;
        return styles;
    }

    const shipElements = ships.map((ship, index) => {
        var shipName = `${ship.length} ${index}`;
        return <div
            key={shipName}
            className='absolute bg-slate-500 rounded-3xl pointer-events-none' 
            style={placeShip(ship)}
        />
    })

    return (
        <div className="w-max h-max mx-auto mt-4 relative
        border rounded-sm p-1 bg-slate-200 border-slate-200">
            <div className="grid gap-1 grid-cols-6 grid-rows-6">
                {fillGrid()}
            </div>
            {shipElements}
        </div>
    );
}