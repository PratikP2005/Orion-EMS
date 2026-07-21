import React, { useState, useEffect } from "react";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in already on refresh
    const savedUser = localStorage.getItem("ems_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem("ems_user");
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("ems_user", JSON.stringify(userData));
  };

  const handleUpdateUser = (updatedData) => {
    setUser(prev => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem("ems_user", JSON.stringify(newUser));
      return newUser;
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("ems_user");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", color: "var(--text-secondary)" }}>
        Loading Orion EMS...
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return user.role?.toUpperCase() === "ADMIN" ? (
    <AdminDashboard user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
  ) : (
    <EmployeeDashboard user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
  );
}

export default App;
