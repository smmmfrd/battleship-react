import { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../gameContext";

export default function GameOptions() {
    const { boardSize, setBoardSize, enemyAI, setEnemyAI, gameDelay, setGameDelay, setFromOptions } = useContext(GameContext);

    return (
        <main className="w-max mx-auto bg-blue-100 mt-8 p-8 rounded-xl
        flex flex-col gap-8">
            <form className="grid grid-cols-2 gap-x-1 gap-y-4">
                <label htmlFor="size" className="text-right border-2">Board Size:</label>
                <select id="size" value={boardSize} onChange={(e) => setBoardSize(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-1">
                    <option value={6}>Small</option>
                    <option value={8}>Medium</option>
                    <option value={10}>Regular</option>
                    <option value={12}>Large</option>
                </select>
                <label htmlFor="enemy" className="text-right border-2">Enemy AI:</label>
                <select id="enemy" value={enemyAI} onChange={(e) => setEnemyAI(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-1">
                    <option value={"random"}>Random</option>
                    <option value={"semi-random"}>Fair</option>
                    <option value={"perfect"}>Perfect</option>
                </select>
                <label htmlFor="delay" className="text-right border-2">Time Between Turns:</label>
                <select id="delay" value={gameDelay} onChange={(e) => setGameDelay(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-1">
                    <option value={1000}>1 Second</option>
                    <option value={2000}>2 Seconds</option>
                    <option value={3000}>3 Seconds</option>
                </select>
            </form>
            <Link to="/player" className="py-2 text-center bg-blue-300 hover:underline rounded-md" 
                onClick={() => setFromOptions(true)}>
                Make Your Board
            </Link>
        </main>
    );
}
