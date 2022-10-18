import { useContext, useEffect } from "react";
import { GameContext } from "../gameContext";
import EnemyBoard from "./EnemyBoard";
import PlayerBoard from "./PlayerBoard";

export default function Game({BOARD_SIZE, SHIP_MARGIN, SHIP_LENGTHS}) {
    const {playerBoard, setPlayerBoard, enemyBoard} = useContext(GameContext);
    
    // Wait for enemy board to change
    useEffect(() => {
        // Make sure it was from a player attack
        if(enemyBoard.board && enemyBoard.board.some(pos => pos > 0)) {
            // Check if player won
            console.log("Number of hits on enemy's board:", enemyBoard.board.reduce((hits, current) => {
                if(current != 2) {
                    return hits;
                } else {
                    return hits + 1;
                }
            }, 0));
            // If not, 
            randomAttack();
        }
    }, [enemyBoard]);

    function randomAttack() {
        var validTargets = playerBoard.board.reduce((array, pos, index) => {
            if(pos === 0) {
                return [...array, index];
            } else {
                return array;
            }
        }, []);

        // Update the player's board
        setPlayerBoard(prevBoard => {
            var newBoard = {...prevBoard};
            newBoard.attacked(validTargets[Math.floor(Math.random() * validTargets.length)]);
            return newBoard;
        });

        // Check if enemy won
        console.log("Number of hits on player's board:", playerBoard.board.reduce((hits, current) => {
            if(current != 2) {
                return hits;
            } else {
                return hits + 1;
            }
        }, 0));
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">Time to Battle Ship!</h1>
            <EnemyBoard
                BOARD_SIZE={BOARD_SIZE}
                SHIP_MARGIN={SHIP_MARGIN}
                SHIP_LENGTHS={SHIP_LENGTHS}
            />
            <PlayerBoard 
                BOARD_SIZE={BOARD_SIZE}
                SHIP_MARGIN={SHIP_MARGIN}
                playerBoard={playerBoard}
            />
        </>
    );
}