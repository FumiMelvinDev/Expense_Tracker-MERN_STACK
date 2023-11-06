import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <nav className="bg-teal-900 text-emerald-50">
      <div className="flex items-center justify-between mx-auto py-2 max-w-3xl sm:px-6 px-3">
        <div className="font-mono text-2xl">
          <span className="self-center text-2xl font-semibold whitespace-nowrap hover:cursor-pointer">
            Expense Tracker
          </span>
        </div>

        <div className="flex items-center sm:space-x-4">
          {user ? (
            <>
              <div className="text-slate-200">Hi, {user && user.name}</div>
              <button
                onClick={onLogout}
                className="block p-2 text-slate-300 rounded hover:underline hover:text-fuchsia-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block p-2 text-slate-300 rounded hover:underline hover:text-fuchsia-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block p-2 text-slate-300 rounded hover:underline hover:text-fuchsia-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
