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

    function addShip(x, y, length, vertical) {
        ships.push({x, y, length, vertical});
        var shipPosition = x + (y * boardSize);
        for (let i = 0; i < length; i++) {
            shipLocations.push(shipPosition + (i * (vertical ? boardSize : 1)));
        }
    }

    function attacked(position) {
        board[position] = shipLocations.includes(position) ? BoardState.HIT : BoardState.MISS;
    }

    return {
        board,
        addShip,
        ships,
        attacked
    }
}