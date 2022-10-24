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
    const [gameState, setGameState] = useState('You go first! Click on a square to fire at the enemy!');
    const [enemyTurn, setEnemyTurn] = useState(false);

    useEffect(() => {
        // Make sure the change was not from set up
        if(enemyBoard.board && enemyBoard.board.some(pos => pos > 0)) {
            // Check if player won
            var enemyHits = enemyBoard.board.reduce((hits, current) => {
                if(current != 2) {
                    return hits;
                } else {
                    return hits + 1;
                }
            }, 0);
            setEnemyTurn(true);
            const enemyResponse = setTimeout(() => {
                if(enemyHits === numHitsLose) {
                    gameOver(true);
                    // setGameState("All enemy ships are down!!!");
                } else {
                    // If not,
                    enemyAttack();
                    // setGameState("The enemy fired upon you!");
                }
                setEnemyTurn(false);
            }, 500);

            return () => clearTimeout(enemyResponse);
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
            newBoard.attacked(validTargets[Math.floor(Math.random() * validTargets.length)], playerShotUpdate);
            
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
            newBoard.attacked(validTargets[Math.floor(Math.random() * validTargets.length)], playerShotUpdate);

            return newBoard;
        });
    }

    function enemyShotUpdate(hit) {
        setGameState('You fired at the enemy!' + (hit ? ' HIT!' : ' MISS!'));
    }

    function playerShotUpdate(hit) {
        setGameState('The enemy fired at you!' + (hit ? ' HIT!' : ' MISS!'));
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
            <dialog ref={newGameModal} className="mt-32">
                <div className="flex flex-col text-center gap-6">
                    <h2 className="text-4xl underline">{endingMessage}</h2>
                    <div className="bg-blue-600 text-neutral-50 w-max px-2 py-1 rounded-xl mx-auto text-center hover:underline">
                        <Link to="/">Restart</Link>
                    </div>
                </div>
            </dialog>
            <h1 className="text-3xl font-bold underline text-center">Time to Battle Ship!</h1>
            <main>
                <p className="text-center">{gameState}</p>
                <div className="w-full flex justify-evenly md:flex-row flex-col">
                    <EnemyBoard
                        onHit={enemyShotUpdate}
                        invincible={enemyTurn}
                    />
                    <PlayerBoard
                        playerBoard={playerBoard}
                    />
                </div>
            </main>
        </>
    );
}