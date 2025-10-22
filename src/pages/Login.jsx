import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { UserContext } from "../context/UserContext"; // ✅ import the context

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // ✅ get login() from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/login", { email, password });
      const { token, id, name } = res.data.data;

      // ✅ use context to set global login state (also updates App.jsx immediately)
      login(name, token);

      // still keep userId in localStorage for project references
      localStorage.setItem("userId", id);

      navigate("/ide");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-slate-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Login to CipherStudio
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <label className="block mb-2 text-gray-600 text-sm">Email</label>
        <input
          type="email"
          className="border rounded w-full p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-gray-600 text-sm">Password</label>
        <input
          type="password"
          className="border rounded w-full p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 w-full text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
