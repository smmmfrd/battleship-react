import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GameContextProvider } from "./gameContext";

import PlayerBoardCreator from "./components/PlayerBoardCreator";
import Game from "./components/Game";
import GameOptions from "./components/GameOptions";

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


function Navbar() {
  return (
    <>
      <nav>

      </nav>
      <Outlet />
    </>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full p-2 bg-slate-500 text-neutral-50 flex md:flex-row flex-col gap-4 md:gap-16 justify-around items-center">
      <p>No Association w/ Hasbro</p>
      <p>By <a className="underline" href="https://github.com/smmmfrd" target='_blank' rel="noopener noreferrer">@smmmfrd</a> &#169; 2021</p>
    </footer>
  )
}