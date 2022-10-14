import { useContext } from "react";
import { GameContext } from "../gameContext";
import EnemyBoard from "./EnemyBoard";
import PlayerBoard from "./PlayerBoard";

export default function Game({BOARD_SIZE, SHIP_MARGIN, SHIP_LENGTHS}) {
    const {playerBoard} = useContext(GameContext);
    
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