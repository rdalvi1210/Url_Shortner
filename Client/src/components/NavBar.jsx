import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../store/slice/authSlice";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate({ to: "/" });
  };

  return (
    <nav className="bg-[#4B145B] shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo and App Name */}
          <div className="flex items-center space-x-2">
            {/* Monkey Logo */}
            <div className="w-10 h-10 bg-[#6A1B79] text-white flex items-center justify-center rounded-full text-xl font-bold">
              🐵
            </div>
            <Link
              to="/"
              className="text-xl font-bold text-white hover:text-[#EADAF4] transition-colors"
            >
              URL Shortener
            </Link>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#6A1B79] transition"
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {/* Display username */}
                <span className="px-3 py-2 rounded-md text-sm font-medium text-[#EADAF4] bg-[#6A1B79]">
                  {user?.user?.name || user?.email || "User"}
                </span>

                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#6A1B79] transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-[#EADAF4] text-[#4B145B] hover:bg-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-[#EADAF4] text-[#EADAF4] hover:bg-[#EADAF4] hover:text-[#4B145B] transition"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#6A1B79] hover:bg-[#3A0D47] shadow-md transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
