import { Outlet } from "react-router-dom";


export default function Navbar() {
    return (
      <>
        <nav className="p-4">
            <p className="text-2xl">Battleship</p>
        </nav>
        <Outlet />
      </>
    );
  }
  