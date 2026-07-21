import React from "react";
import { LogOut, User, ShieldCheck, UserCheck } from "lucide-react";

const Header = ({ user, onLogout }) => {
  const isAdmin = user?.role?.toLowerCase() === "admin";

  return (
    <header className="app-header glass-panel animate-fade-in" style={{ padding: "16px 24px" }}>
      <div className="user-info">
        <h2>Welcome back,</h2>
        <h1 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {user?.name || "User"}
          <span className={`badge ${isAdmin ? "badge-danger" : "badge-success"}`} style={{ display: "inline-flex", gap: "4px", padding: "4px 8px" }}>
            {isAdmin ? <ShieldCheck size={12} /> : <UserCheck size={12} />}
            {isAdmin ? "Admin" : "Employee"}
          </span>
        </h1>
      </div>
      <div>
        <button onClick={onLogout} className="btn btn-danger" style={{ gap: "8px" }}>
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
