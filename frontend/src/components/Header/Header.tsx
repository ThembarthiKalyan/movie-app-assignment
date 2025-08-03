import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide text-white ">
          Movies List
        </Link>

        <nav className="space-x-6">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-300"
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/actors"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-300"
            }
          >
            Actors
          </NavLink>
          <NavLink
            to="/directors"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-300"
            }
          >
            Directors
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
