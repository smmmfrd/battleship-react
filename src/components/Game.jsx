import { useContext, useEffect } from "react";
import { GameContext } from "../gameContext";
import EnemyBoard from "./EnemyBoard";
import PlayerBoard from "./PlayerBoard";

export default function Game({BOARD_SIZE, SHIP_MARGIN, SHIP_LENGTHS}) {
    const {playerBoard, setPlayerBoard, enemyBoard} = useContext(GameContext);
    var numHitsLose = SHIP_LENGTHS.reduce((val, length) => val + length, 0);

    useEffect(() => {
        console.log('hey');
        // Make sure it was from a player attack
        if(enemyBoard.board && enemyBoard.board.some(pos => pos > 0)) {
            // Check if player won
            var enemyHits = enemyBoard.board.reduce((hits, current) => {
                if(current != 2) {
                    return hits;
                } else {
                    return hits + 1;
                }
            }, 0);
            if(enemyHits === numHitsLose) {
                console.log('enemy lost');
            } else {
                // If not, 
                perfectEnemyAttack();
            }
        }
    }, [enemyBoard]);

    useEffect(() => {
        var playerHits = playerBoard.board.reduce((hits, current) => {
            if(current != 2) {
                return hits;
            } else {
                return hits + 1;
            }
        }, 0);

        // Check if enemy won
        if(playerHits === numHitsLose) {
            console.log('playerLost');
        }
    }, [playerBoard])

    function randomEnemyAttack() {
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
    }

    function perfectEnemyAttack() {
        var validTargets = playerBoard.board.reduce((array, pos, index) => {
            if(pos === 0 && playerBoard.shipLocations.includes(index)) {
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