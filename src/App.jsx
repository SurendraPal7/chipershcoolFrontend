import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

export default function App() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const script = document.createElement("script");
      script.src = "https://static.cloudflareinsights.com/beacon.min.js";
      script.defer = true;
     
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-[#f4e9db] border-b shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-bold text-xl tracking-tight text-gray-800 hover:text-indigo-600"
            >
              CipherStudio
            </Link>

            {user.name && (
              <span className="text-gray-700 text-sm font-medium">
                👋 Welcome, {user.name}!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-3 py-1 rounded hover:bg-white hover:text-indigo-600 transition"
            >
              Home
            </Link>
            <Link
              to="/ide"
              className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Open IDE
            </Link>

            {!user.token ? (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded hover:bg-white hover:text-indigo-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 rounded hover:bg-white hover:text-indigo-600 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow max-w-6xl mx-auto p-4 w-full">
        <Outlet />
      </main>

      <footer className="bg-[#f4e9db] border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} CipherStudio — Built with React & ❤️
        </div>
      </footer>
    </div>
  );
}
