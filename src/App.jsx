import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

import PlayerBoardCreator from "./components/PlayerBoardCreator";
import EnemyBoard from "./components/EnemyBoard";

// Board is always a square, so a board size of 6 is a 6x6.
const BOARD_SIZE = 6;

const SHIP_MARGIN = 4;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route index element={<GameOptions />} />
          <Route path="player" element={<PlayerBoardCreator
            BOARD_SIZE={BOARD_SIZE}
            SHIP_MARGIN={SHIP_MARGIN} />} />
          <Route path="game" element={<EnemyBoard
            BOARD_SIZE={BOARD_SIZE}
            SHIP_MARGIN={SHIP_MARGIN} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function GameOptions() {
  console.log("here i am");
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