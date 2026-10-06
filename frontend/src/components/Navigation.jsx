import { Link, NavLink } from "react-router";

export default function Navigation() {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="navbar mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex-1">
          <Link to="/" className="text-lg font-bold tracking-tight">
            Release Checklist
          </Link>
        </div>

        <div>
          <NavLink to="/releases/new" className="btn btn-primary btn-sm sm:btn-md">
            + New Release
          </NavLink>
        </div>
      </div>
    </header>
  );
}
