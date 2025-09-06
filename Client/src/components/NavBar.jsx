import { Link } from "@tanstack/react-router";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/"; // backend clears session/cookie
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-tight"
          >
            URL Shortener
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {["Home", "Features", "Dashboard"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="relative text-gray-700 font-medium transition group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right side Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hello, {user?.user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-200/60 transition"
            >
              {menuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/95 shadow-xl transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 h-20 border-b">
          <span className="text-lg font-bold text-gray-800">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-md hover:bg-gray-200/60 transition"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-6 space-y-6">
          {["Home", "Features", "Dashboard"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 text-lg font-medium hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}

          {user ? (
            <>
              <span className="text-gray-700 text-lg font-medium">
                Hello, {user.name}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md text-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
