import { useEffect } from "react";
import GridSquare from "./components/GridSquare";

// Board is always a square, so a board size of 6 is a 6x6.
const BOARD_SIZE = 6;

const SHIP_MARGIN = 4;

export default function App() {
  // Temporary Ship Placements
  useEffect(() => {
    editShip('test-ship', 0, 0, 2, false);
    editShip('test-ship-med', 2, 2, 3, false);
    editShip('test-ship-long', 0, 1, 4, true);
  }, []);

  function fillGrid(){
    var squares = [];
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
      squares.push(
        <GridSquare key={i}/>
      )
    }
    return squares;
  }

  function editShip(shipName, x, y, length, vertical){
    var ship = document.getElementById(shipName);

    const longSideLength = () => {
      return 32 * length + (length - 1) * 4;
    }

    const getPosition = (val) => {
      return (val * 36) + 4;
    }

    ship.style.width = `${(vertical ? 32 : longSideLength()) - SHIP_MARGIN * 2}px`;
    ship.style.height = `${(vertical ? longSideLength() : 32) - SHIP_MARGIN * 2}px`;
    ship.style.left = `${getPosition(x) + SHIP_MARGIN}px`;
    ship.style.top = `${getPosition(y) + SHIP_MARGIN}px`;
  }

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Time to Battle Ship!
      </h1>
      <div className="w-max h-max mx-auto mt-4 relative
        border rounded-sm p-1 bg-slate-200 border-slate-200">
        <div className="grid gap-1 grid-cols-6 grid-rows-6">
          {fillGrid()}
        </div>
        <div id="test-ship" className='absolute bg-slate-500 rounded-3xl'/>
        <div id="test-ship-med" className='absolute bg-slate-500 rounded-3xl'/>
        <div id="test-ship-long" className='absolute bg-slate-500 rounded-3xl'/>
      </div>
    </div>
  );
}