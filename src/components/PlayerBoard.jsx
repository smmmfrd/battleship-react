import BoardDisplay from "./BoardDisplay";

export default function PlayerBoard({BOARD_SIZE, SHIP_MARGIN, playerBoard}){
    
    return (
        <BoardDisplay
            boardSize={BOARD_SIZE}
            shipMargin={SHIP_MARGIN}
            shipData={playerBoard.ships}
            boardData={playerBoard.board}
        />
    )
}