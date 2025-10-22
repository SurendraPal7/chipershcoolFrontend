import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "",
    token: localStorage.getItem("token") || "",
  });

  // ✅ Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser({
        name: localStorage.getItem("userName") || "",
        token: localStorage.getItem("token") || "",
      });
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Called after login/register
  const login = (name, token) => {
    localStorage.setItem("userName", name);
    localStorage.setItem("token", token);
    setUser({ name, token });
  };

  // ✅ Called on logout
  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser({ name: "", token: "" });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
