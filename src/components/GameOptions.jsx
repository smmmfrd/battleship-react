import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../gameContext";

export default function GameOptions() {
    const [boardSize, setBoardSize] = useState(6);
    const [enemyAI, setEnemyAI] = useState('random');
    const { setBoardSize: setContextBoardSize, setEnemyAI: setContextAI } = useContext(GameContext);

    return (
        <main className="w-max mx-auto bg-blue-100 mt-8 p-8 rounded-xl
            flex flex-col gap-8">
            <form className="grid grid-cols-2 gap-x-1 gap-y-4">
                <label htmlFor="size" className="text-right border-2">Board Size:</label>
                <select id="size" value={boardSize} onChange={(e) => setBoardSize(e.target.value)}
                    className="border-2 border-blue-300 rounded-md">
                    <option value={6}>Small</option>
                    <option value={8}>Medium</option>
                    <option value={10}>Regular</option>
                    <option value={12}>Large</option>
                </select>
                <label htmlFor="enemy" className="text-right border-2">Enemy AI:</label>
                <select id="enemy" value={enemyAI} onChange={(e) => setEnemyAI(e.target.value)}
                    className="border-2 border-blue-300 rounded-md">
                    <option value={"random"}>Random</option>
                    <option value={"semi-random"}>Fair</option>
                    <option value={"perfect"}>Perfect</option>
                </select>
            </form>
            <Link to="/player" onClick={() => {
                setContextBoardSize(boardSize);
                setContextAI(enemyAI);}}
                className="py-2 text-center bg-blue-300 hover:underline rounded-md">
                Make your Board</Link>
        </main>
    );
}
