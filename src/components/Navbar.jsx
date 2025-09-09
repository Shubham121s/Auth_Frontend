import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-3 shadow-md">
      <h1 className="text-xl font-bold">MERN Auth Role Dashboard</h1>

      {user ? (
        <div className="flex items-center gap-6">
          {/* Links based on role */}
          {user.role === "Admin" && (
            <Link to="/admin" className="hover:text-gray-300">
              Admin Dashboard
            </Link>
          )}
          {user.role === "Student" && (
            <Link to="/student" className="hover:text-gray-300">
              Student Dashboard
            </Link>
          )}

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link to="/signup" className="hover:text-gray-300">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
