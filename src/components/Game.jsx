import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../gameContext";
import EnemyBoard from "./EnemyBoard";
import PlayerBoard from "./PlayerBoard";

export default function Game() {
    const SHOT_SUCCESS_DELAY = 500;
    const PLAYER_FIRED_MESSAGE = 'You fired at the enemy!';
    const ENEMY_FIRED_MESSAGE = 'The enemy fired at you!';

    const { playerBoard, setPlayerBoard, enemyBoard, shipLengths, enemyAI, boardSize, gameDelay } = useContext(GameContext);
    const newGameModal = useRef();
    var numHitsLose = shipLengths.reduce((val, length) => val + length, 0);
    const [endingMessage, setEndingMessage] = useState('');
    const [displayEnemyShips, setDisplayEnemyShips] = useState(false);
    const [enemyTurn, setEnemyTurn] = useState(false);
    const [gameState, setGameState] = useState({
        message: 'You go first! Click on a square to fire at the enemy!',
        goodHit: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!playerBoard.board) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        // Make sure the change was not from set up
        if (enemyBoard.board && enemyBoard.board.some(pos => pos > 0)) {
            // Check if player won
            var enemyHits = enemyBoard.board.reduce((hits, current) => {
                if (current != 2) {
                    return hits;
                } else {
                    return hits + 1;
                }
            }, 0);
            setEnemyTurn(true);

            // Setting a delay here
            const enemyResponse = setTimeout(() => {
                if (enemyHits === numHitsLose) {
                    gameOver(true);
                } else {
                    // If not,
                    enemyAttack();
                }
            }, gameDelay);

            return () => clearTimeout(enemyResponse);
        }
    }, [enemyBoard]);

    useEffect(() => {
        if (!playerBoard.board) {
            return;
        }

        var playerHits = playerBoard.board.reduce((hits, current) => {
            if (current != 2) {
                return hits;
            } else {
                return hits + 1;
            }
        }, 0);

        // Check if enemy won
        if (playerHits === numHitsLose) {
            gameOver(false);
        }
    }, [playerBoard]);

    useEffect(() => {
        if (gameState.message === PLAYER_FIRED_MESSAGE || gameState.message === ENEMY_FIRED_MESSAGE) {
            var enemy = gameState.message === ENEMY_FIRED_MESSAGE;

            // Another delay here
            const gameStateUpdate = setTimeout(() => {
                setGameState(prevState => {
                    return {
                        message: prevState.message + (prevState.goodHit ? ' HIT!' : ' MISS!'),
                        goodHit: prevState.goodHit
                    }
                });
                if (enemy) {
                    setEnemyTurn(false);
                }
            }, SHOT_SUCCESS_DELAY);

            return () => clearTimeout(gameStateUpdate);
        }
    }, [gameState]);

    function enemyAttack() {
        switch (enemyAI) {
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
            if (pos === 0) {
                return [...array, index];
            } else {
                return array;
            }
        }, []);

        // Update the player's board
        setPlayerBoard(prevBoard => {
            var newBoard = { ...prevBoard };
            newBoard.attacked(validTargets[Math.floor(Math.random() * validTargets.length)], enemyShotUpdate);

            return newBoard;
        });
    }

    //every five attacks it is guaranteed to hit the a player ship.
    function semiRandomEnemyAttack() {
        var numAttacks = playerBoard.board.reduce((total, pos) => pos > 0 ? total + 1 : total, 0);
        if (numAttacks > 0 && (numAttacks + 1) % 5 === 0) {
            perfectEnemyAttack();
        } else {
            randomEnemyAttack();
        }
    }

    function perfectEnemyAttack() {
        var validTargets = playerBoard.board.reduce((array, pos, index) => {
            if (pos === 0 && playerBoard.shipLocations.includes(index)) {
                return [...array, index];
            } else {
                return array;
            }
        }, []);

        // Update the player's board
        setPlayerBoard(prevBoard => {
            var newBoard = { ...prevBoard };
            newBoard.attacked(validTargets[Math.floor(Math.random() * validTargets.length)], enemyShotUpdate);

            return newBoard;
        });
    }

    async function playerShotUpdate(hit) {
        await new Promise(res => setTimeout(res, 50));
        setGameState({
            message: PLAYER_FIRED_MESSAGE,
            goodHit: hit
        });
    }

    async function enemyShotUpdate(hit) {
        await new Promise(res => setTimeout(res, 50));
        setGameState({
            message: ENEMY_FIRED_MESSAGE,
            goodHit: hit
        });
    }

    async function gameOver(playerWon) {
        setDisplayEnemyShips(true);
        await new Promise(res => setTimeout(res, gameDelay * 2));
        setEndingMessage(playerWon ? "You sunk all the enemy ships!" : "All your ships were sunk!");

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
            <header className="mb-4">
                <h1 className="text-3xl font-bold underline text-center">Time to Battle Ship!</h1>
            </header>
            <main className="w-full mx-auto">
                <p className="bg-blue-900 text-yellow-300 font-mono w-3/4 mx-auto p-2">{gameState.message}</p>
                <div className={`w-full flex justify-around flex-col ${boardSize > 10 ? "lg:flex-row" : "md:flex-row"}`}>
                    <EnemyBoard
                        onHit={playerShotUpdate}
                        invincible={enemyTurn}
                        gameOver={displayEnemyShips}
                    />
                    <PlayerBoard
                        playerBoard={playerBoard}
                    />
                </div>
            </main>
        </>
    );
}