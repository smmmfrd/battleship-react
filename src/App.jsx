import EnemyBoard from "./components/EnemyBoard";

// Board is always a square, so a board size of 6 is a 6x6.
const BOARD_SIZE = 6;

const SHIP_MARGIN = 4;

export default function App() {
  return (
    <>
      <EnemyBoard 
        BOARD_SIZE={BOARD_SIZE}
        SHIP_MARGIN={SHIP_MARGIN}
      />
    </>
  )
}