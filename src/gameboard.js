const BoardState = {
    EMPTY: 0,
    
}

export default function GameBoard(boardSize){
    var board = [];
    var ships = [];

    for (let i = 0; i < boardSize * boardSize; i++) {
        board.push(BoardState.EMPTY);
    }

    function addShip(x, y, length, vertical) {
        ships.push({x, y, length, vertical});
    }

    return {
        board,
        addShip,
        ships
    }
}