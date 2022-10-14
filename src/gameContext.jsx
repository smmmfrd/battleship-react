import React, {useState} from "react";
const GameContext = React.createContext();

function GameContextProvider({children}){
    const [playerBoard, setPlayerBoard] = useState({});

    function setBoard(newBoard) {
        setPlayerBoard(newBoard);
    }

    return (
        <GameContext.Provider value={{playerBoard, setBoard}}>
            {children}
        </GameContext.Provider>
    );
}

export {GameContext, GameContextProvider}