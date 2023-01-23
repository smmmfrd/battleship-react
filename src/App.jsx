import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameContextProvider } from "./gameContext";

import PlayerBoardCreator from "./components/PlayerBoardCreator";
import Game from "./components/Game";
import GameOptions from "./components/GameOptions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <Footer />
    </BrowserRouter>
  );
}