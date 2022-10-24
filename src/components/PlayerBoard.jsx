import BoardDisplay from "./BoardDisplay";

export default function PlayerBoard({ playerBoard }){
    
    return (
        <BoardDisplay
            shipData={playerBoard.ships}
            boardData={playerBoard.board}
        >
            <h3 className="text-2xl text-center">Your Waters</h3>
        </BoardDisplay>
    )
}