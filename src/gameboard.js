const BoardState = {
    EMPTY: 0,
    MISS: 1,
    HIT: 2
}

export default function GameBoard(boardSize){
    var board = [];
    var ships = [];
    var shipLocations = [];

    for (let i = 0; i < boardSize * boardSize; i++) {
        board.push(BoardState.EMPTY);
    }

    function goodPosition(position, length, vertical) {
        var testPositions = [];
        for (let i = 0; i < length; i++) {
            if(vertical) {
                testPositions.push(position + (i * boardSize));
            } else {
                testPositions.push(position + i);
            }
        }
        var valid = true;
        testPositions.forEach(pos => {
            // Check if any ships are there
            if(shipLocations.includes(pos)) {
                valid = false;
            }
            // Make sure not out of bounds vertically
            if(pos >= boardSize * boardSize) {
                valid = false;
            }
            // Make sure not out of bounds horizontally
            if(!vertical && parseInt(testPositions[0] / boardSize) != parseInt(pos / boardSize)) {
                valid = false;
            }
        });
        return valid;
    }

    function addShip(x, y, length, vertical) {
        ships.push({x, y, length, vertical});
        var shipPosition = x + (y * boardSize);
        for (let i = 0; i < length; i++) {
            shipLocations.push(shipPosition + (i * (vertical ? boardSize : 1)));
        }
    }

    function attacked(position, onHit = () => {}) {
        var hit = shipLocations.includes(position);
        board[position] = hit ? BoardState.HIT : BoardState.MISS;
        onHit(hit);
    }

    return {
        board,
        addShip,
        ships,
        attacked,
        goodPosition,
        shipLocations
    }
}