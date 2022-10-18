import React, {useState} from "react";
const GameContext = React.createContext();

function GameContextProvider({children}){
    const [playerBoard, setPlayerBoard] = useState({});
    const [enemyBoard, setEnemyBoard] = useState({});

    return (
        <GameContext.Provider value={{playerBoard, setPlayerBoard, enemyBoard, setEnemyBoard}}>
            {children}
        </GameContext.Provider>
    );
}

export {GameContext, GameContextProvider}