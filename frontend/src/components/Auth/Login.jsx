import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePortal, setActivePortal] = useState("admin"); // 'admin' or 'employee'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Login failed");
      }

      const data = await response.json();
      
      // Enforce portal selection check
      const isAdminRole = data.role === "ADMIN";
      if ((activePortal === "admin" && !isAdminRole) || (activePortal === "employee" && isAdminRole)) {
         throw new Error(`Please log in through the ${isAdminRole ? 'Admin' : 'Employee'} portal.`);
      }

      onLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-layout">
      <div className="split-left">
        <h1 style={{ fontWeight: "700" }}>
          Welcome back to<br/>
          Employee<br/>
          Management<br/>
          System
        </h1>
        <p style={{ marginTop: "1rem" }}>
          Streamline your HR workflows, manage employee data, attendance, and payroll all in one unified platform.
        </p>

        <div style={{ marginTop: "3rem", display: "flex", gap: "16px" }}>
          <button 
            onClick={() => setActivePortal("admin")}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: activePortal === "admin" ? "2px solid #5c5cfc" : "2px solid transparent",
              background: activePortal === "admin" ? "rgba(92, 92, 252, 0.15)" : "rgba(255,255,255,0.05)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            Admin Portal
          </button>
          <button 
            onClick={() => setActivePortal("employee")}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: activePortal === "employee" ? "2px solid #5c5cfc" : "2px solid transparent",
              background: activePortal === "employee" ? "rgba(92, 92, 252, 0.15)" : "rgba(255,255,255,0.05)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            Employee Portal
          </button>
        </div>
      </div>
      <div className="split-right">
        <div style={{ width: "100%", maxWidth: "400px", padding: "40px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            {activePortal === "admin" ? "Admin Login" : "Employee Login"}
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            Please enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {error && (
              <div style={{ background: "#fee2e2", color: "#ef4444", padding: "12px", borderRadius: "8px", fontSize: "0.9rem" }}>
                {error}
              </div>
            )}
            
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-main)", fontSize: "0.9rem" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                style={{ padding: "12px 16px" }}
              />
            </div>
            
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontWeight: "500", color: "var(--text-main)", fontSize: "0.9rem" }}>
                  Password
                </label>
                <a href="#" style={{ color: "var(--primary)", fontSize: "0.85rem", textDecoration: "none", fontWeight: "500" }}>
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                style={{ padding: "12px 16px" }}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ padding: "14px", marginTop: "10px", fontSize: "1rem" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "2rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
             © 2026 Employee Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
