import BoardDisplay from "./BoardDisplay";

export default function PlayerBoard({ playerBoard }){
    
    return (
        <BoardDisplay
            shipData={playerBoard.ships}
            boardData={playerBoard.board}
            title={"Your Waters"}
        />
    )
}