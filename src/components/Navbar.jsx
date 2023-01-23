import { Link, Outlet, useLocation } from "react-router-dom";


export default function Navbar() {
  const location = useLocation();
  console.log(location)

  return (
    <>
      <nav className="p-4 flex justify-between">
        <p className="text-2xl">Battleship</p>
        {location.pathname != "/" && <Link to="/">New Game</Link>}
      </nav>
      <Outlet />
    </>
  );
}
