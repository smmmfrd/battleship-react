import { useRef } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { GameContextProvider } from "./gameContext";

import PlayerBoardCreator from "./components/PlayerBoardCreator";
import Game from "./components/Game";

// Board is always a square, so a board size of 6 is a 6x6.
const BOARD_SIZE = 6;

const SHIP_MARGIN = 4;

const SHIP_LENGTHS = [2, 3, 3, 4, 5];

export default function App() {
  return (
    <BrowserRouter>
      <GameContextProvider>
        <Routes>
          <Route path="/" element={<Navbar />} >
            <Route index element={<GameOptions />} />
            <Route path="player" element={
              <PlayerBoardCreator
                BOARD_SIZE={BOARD_SIZE}
                SHIP_MARGIN={SHIP_MARGIN}
                SHIP_LENGTHS={SHIP_LENGTHS}
              />}
            />
            <Route path="game" element={
              <Game
                BOARD_SIZE={BOARD_SIZE}
                SHIP_MARGIN={SHIP_MARGIN}
                SHIP_LENGTHS={SHIP_LENGTHS}
              />}
            />
          </Route>
        </Routes>
      </GameContextProvider>

    </BrowserRouter>
  );
}

function GameOptions() {
  return (
    <Link to="/player">Make your Board</Link>
  );
}

function Navbar() {
  return (
    <>
      <nav>

      </nav>
      <Outlet />
    </>
  );
}