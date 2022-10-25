import { useEffect, useState, useContext } from "react";
import { GameContext } from "../gameContext";

import GameBoard from "../gameboard";

import BoardDisplay from "./BoardDisplay";

export default function EnemyBoard({onHit, invincible, gameOver}) {
    const {enemyBoard, setEnemyBoard, boardSize, shipLengths} = useContext(GameContext);

    // TEMP - placing ships on a static board
    useEffect(() => {
        setEnemyBoard(() => {
            var newBoard = GameBoard(boardSize);
            buildEnemyBoard(newBoard);
            while(newBoard.ships.length !== shipLengths.length) {
                buildEnemyBoard(newBoard);
            }
            return newBoard;
        });
    }, []);

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Addition: swap randomly between the x or y values here
            if(Math.random() < 0.5) {
                [array[currentIndex].x, array[randomIndex].x] = [
                    array[randomIndex].x, array[currentIndex].x];
            } else {
                [array[currentIndex].y, array[randomIndex].y] = [
                    array[randomIndex].y, array[currentIndex].y];
            }
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function buildEnemyBoard(board) {
        var placements = [];
        for (let i = 0; i < boardSize; i++) {
            placements.push({x: i, y: i});
        }
        shuffle(placements);

        var lengths = [...shipLengths];
        lengths.reverse().forEach(length => {
            for(let i = 0; i < placements.length; i++){
                var placed = false;
                var pos = placements[i];
                var position = pos.x + (pos.y * boardSize);
                var vert = Math.random() < 0.5;
                if (board.goodPosition(position, length, vert)) {
                    board.addShip(pos.x, pos.y, length, vert);
                    placed = true;
                } else {
                    if (board.goodPosition(position, length, !vert)) {
                        board.addShip(pos.x, pos.y, length, !vert);
                        placed = true;
                    }
                }
                if(placed) {
                    break;
                }
            }
        });
    }

    function handleSquareClick(position) {
        if(invincible) {
            return;
        }
        setEnemyBoard(prevBoard => {
            var newBoard = { ...prevBoard };
            newBoard.attacked(position, onHit);
            return newBoard;
        });
    }

    return (
        <BoardDisplay
            shipData={enemyBoard.ships}
            boardData={enemyBoard.board}
            displayShips={gameOver}
            handleSquareClick={handleSquareClick}
        >
            <h3 className="text-2xl text-center">Enemy Waters</h3>
        </BoardDisplay>
    );
}