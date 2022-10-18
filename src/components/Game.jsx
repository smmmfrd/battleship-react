import { useContext } from "react";
import { GameContext } from "../gameContext";
import EnemyBoard from "./EnemyBoard";
import PlayerBoard from "./PlayerBoard";

export default function Game({BOARD_SIZE, SHIP_MARGIN, SHIP_LENGTHS}) {
    const {playerBoard, setBoard} = useContext(GameContext);
    
    function playerAttacked() {
        randomAttack();
    }

    function randomAttack() {
        var validTargets = playerBoard.board.reduce((array, pos, index) => {
            if(pos === 0) {
                return [...array, index];
            } else {
                return array;
            }
        }, []);

        // Update the player's board
        setBoard(prevBoard => {
            var newBoard = {...prevBoard};
            newBoard.attacked(validTargets[Math.floor(Math.random() * validTargets.length)]);
            return newBoard;
        });
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">Time to Battle Ship!</h1>
            <EnemyBoard
                BOARD_SIZE={BOARD_SIZE}
                SHIP_MARGIN={SHIP_MARGIN}
                SHIP_LENGTHS={SHIP_LENGTHS}
                passTurn={playerAttacked}
            />
            <PlayerBoard 
                BOARD_SIZE={BOARD_SIZE}
                SHIP_MARGIN={SHIP_MARGIN}
                playerBoard={playerBoard}
            />
        </>
    );
}