import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../gameContext";
import EnemyBoard from "./EnemyBoard";
import PlayerBoard from "./PlayerBoard";

export default function Game() {
    const {playerBoard, setPlayerBoard, enemyBoard, shipLengths, enemyAI} = useContext(GameContext);
    const newGameModal = useRef();
    var numHitsLose = shipLengths.reduce((val, length) => val + length, 0);
    const [endingMessage, setEndingMessage] = useState('');

    useEffect(() => {
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
                gameOver(true);
            } else {
                // If not,
                enemyAttack();
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
            gameOver(false);
        }
    }, [playerBoard])

    function enemyAttack() {
        switch(enemyAI) {
            case 'random':
                randomEnemyAttack();
                break;
            case 'semi-random':
                semiRandomEnemyAttack();
                break;
            case 'perfect':
                perfectEnemyAttack();
                break;
        }
    }

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

    //every five attacks it is guaranteed to hit the a player ship.
    function semiRandomEnemyAttack() {
        var numAttacks = playerBoard.board.reduce((total, pos) => pos > 0 ? total + 1 : total, 0);
        if(numAttacks > 0 && (numAttacks + 1) % 5 === 0) {
            perfectEnemyAttack();
        } else {
            randomEnemyAttack();
        }
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

    function gameOver(playerWon) {
        setEndingMessage(playerWon ? "You won!" : "You lost!");

        newGameModal.current.addEventListener('cancel', (event) => {
            event.preventDefault();
        });
        newGameModal.current.showModal();
    }

    return (
        <>
            <dialog ref={newGameModal}>
                <h2>Game Over!</h2>
                <p>{endingMessage}</p>
                <Link to="/">Restart</Link>
            </dialog>
            <h1 className="text-3xl font-bold underline">Time to Battle Ship!</h1>
            <EnemyBoard
                SHIP_LENGTHS={shipLengths}
            />
            <PlayerBoard 
                playerBoard={playerBoard}
            />
        </>
    );
}