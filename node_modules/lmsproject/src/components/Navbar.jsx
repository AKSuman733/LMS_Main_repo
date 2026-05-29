import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
      <h1 className="text-2xl font-bold">
        lms<span className="text-orange-400">project</span>
      </h1>

      <div className="flex gap-8 text-gray-300">

  <Link to="/">
    Home
  </Link>

  <Link to="/">
    Courses
  </Link>

  <Link to="/">
    About
  </Link>

  <Link to="/admin">
    Admin
  </Link>

</div>

      <span className="bg-orange-600 px-5 py-2 rounded-xl">
        <Link to="/login">
              Login
            </Link>
      </span>
    </nav>
  );
}

export default Navbar;