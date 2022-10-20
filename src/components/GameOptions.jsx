import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../gameContext";

export default function GameOptions() {
    const [boardSize, setBoardSize] = useState(6);
    const [enemyAI, setEnemyAI] = useState('random');
    const {setBoardSize: setContextBoardSize, setEnemyAI: setContextAI} = useContext(GameContext);

    return (
        <>
            <form>
                <label>Board Size:
                    <select value={boardSize} onChange={(e) => setBoardSize(e.target.value)}>
                        <option value={6}>Small</option>
                        <option value={8}>Medium</option>
                        <option value={10}>Regular</option>
                        <option value={12}>Large</option>
                    </select>
                </label>
                <label>Enemy AI:
                <select value={enemyAI} onChange={(e) => setEnemyAI(e.target.value)}>
                        <option value={"random"}>Random</option>
                        <option value={"semi-random"}>Fair</option>
                        <option value={"perfect"}>Perfect</option>
                    </select>
                </label>
            </form>
            <Link to="/player" onClick={() => {
                setContextBoardSize(boardSize);
                setContextAI(enemyAI);
            }}>Make your Board</Link>
        </>
    );
}
