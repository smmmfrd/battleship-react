import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { GameContextProvider } from "./gameContext";

import PlayerBoardCreator from "./components/PlayerBoardCreator";
import Game from "./components/Game";

export default function App() {
  return (
    <BrowserRouter>
      <GameContextProvider>
        <Routes>
          <Route path="/" element={<Navbar />} >
            <Route index element={<GameOptions />} />
            <Route path="player" element={
              <PlayerBoardCreator />}
            />
            <Route path="game" element={
              <Game />}
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