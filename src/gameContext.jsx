import React, {useState} from "react";
const GameContext = React.createContext();

function GameContextProvider({children}){
    const [playerBoard, setPlayerBoard] = useState({});
    const [enemyBoard, setEnemyBoard] = useState({});
    const [boardSize, setBoardSize] = useState(6);
    const [shipLengths, setShipLengths] = useState([2,3,3,4,5]);

    return (
        <GameContext.Provider value={{playerBoard, setPlayerBoard, enemyBoard, setEnemyBoard, boardSize, setBoardSize, shipLengths, setShipLengths}}>
            {children}
        </GameContext.Provider>
    );
}

export {GameContext, GameContextProvider}