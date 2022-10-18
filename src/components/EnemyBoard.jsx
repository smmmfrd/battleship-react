import { useEffect, useState } from "react";

import GameBoard from "../gameboard";

import BoardDisplay from "./BoardDisplay";

export default function EnemyBoard({ BOARD_SIZE, SHIP_MARGIN, SHIP_LENGTHS, passTurn }) {
    const [enemyBoard, setEnemyBoard] = useState(GameBoard(BOARD_SIZE));

    // TEMP - placing ships on a static board
    useEffect(() => {
        setEnemyBoard(() => {
            var newBoard = GameBoard(BOARD_SIZE);
            buildEnemyBoard(newBoard);
            while(newBoard.ships.length !== SHIP_LENGTHS.length) {
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
        for (let i = 0; i < BOARD_SIZE; i++) {
            placements.push({x: i, y: i});
        }
        shuffle(placements);

        var shipLengths = [...SHIP_LENGTHS];
        shipLengths.reverse().forEach(length => {
            for(let i = 0; i < placements.length; i++){
                var placed = false;
                var pos = placements[i];
                var position = pos.x + (pos.y * BOARD_SIZE);
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
        setEnemyBoard(prevBoard => {
            var newBoard = { ...prevBoard }
            newBoard.attacked(position);
            return newBoard;
        });
        passTurn();
    }

    return (
        <div className="enemy-board">
            <BoardDisplay
                boardSize={BOARD_SIZE}
                shipMargin={SHIP_MARGIN}
                shipData={enemyBoard.ships}
                boardData={enemyBoard.board}
                handleSquareClick={handleSquareClick}
            />
        </div>
    );
}