import GridSquare from "./GridSquare";

export default function BoardDisplay({ boardSize, shipMargin, shipData, boardData, handleSquareClick }) {

    function fillGrid() {
        var squares = [];
        for (let i = 0; i < boardSize * boardSize; i++) {
            // console.log(boardData[i]);
            squares.push(
                <GridSquare key={i} position={i}
                handleClick={boardData[i] > 0 ?  () => {} : handleSquareClick }/>
            );
            switch (boardData[i]) {
                case 0:
                    break;
                case 1:
                    squares.push(
                        <div 
                        key={`${i} ${boardData[i]}`}
                        className="w-6 h-6 m-1 bg-slate-200 rounded-full absolute z-10"
                        style={placeMarker(i)}
                        />
                    );
                    break;
                case 2:
                    squares.push(
                        <div 
                        key={`${i} ${boardData[i]}`}
                        className="w-6 h-6 m-1 bg-red-600 rounded-full absolute z-10"
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

    function placeMarker(position) {
        var styles = {};
        var [x, y] = [position % boardSize, parseInt(position / boardSize)];
        x = (x * 36) + 4;
        y = (y * 36) + 4;
        styles.left = `${x}px`;
        styles.top = `${y}px`;
        return styles;
    }

    const shipElements = shipData.map((ship, index) => {
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