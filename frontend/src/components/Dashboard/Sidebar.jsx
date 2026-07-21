import React from "react";
import { LogOut, LayoutDashboard, Users, Calendar, DollarSign, Settings, Clock } from "lucide-react";

const Sidebar = ({ user, activeTab, setActiveTab, handleLogout }) => {
  const isAdmin = user?.role === "ADMIN";

  const navItems = [];
  navItems.push({ id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> });
  
  if (isAdmin) {
    navItems.push({ id: "employees", label: "Employees", icon: <Users size={18} /> });
  } else {
    navItems.push({ id: "attendance", label: "Attendance", icon: <Clock size={18} /> });
  }
  
  navItems.push({ id: "leave", label: "Leave", icon: <Calendar size={18} /> });
  navItems.push({ id: "payslips", label: "Payslips", icon: <DollarSign size={18} /> });
  navItems.push({ id: "settings", label: "Settings", icon: <Settings size={18} /> });

  // Get initials
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "U";

  return (
    <div className="dashboard-sidebar">
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "transparent", border: "1.5px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Users size={18} color="white" />
          </div>
          <div>
            <h2 style={{ color: "white", fontSize: "1.1rem", margin: 0, fontWeight: "600" }}>Employee MS</h2>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Management System</div>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "16px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "600", fontSize: "0.9rem" }}>
            {initials}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ color: "white", fontSize: "0.9rem", fontWeight: "600", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{user?.name}</div>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{isAdmin ? "Administrator" : "Employee"}</div>
          </div>
        </div>

        <div style={{ fontSize: "0.75rem", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", marginLeft: "12px" }}>
          NAVIGATION
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                padding: "12px",
                background: activeTab === item.id ? "rgba(92, 92, 252, 0.15)" : "transparent",
                color: activeTab === item.id ? "white" : "#cbd5e1",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                textAlign: "left",
                fontWeight: activeTab === item.id ? "600" : "500",
                fontSize: "0.9rem",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ color: activeTab === item.id ? "#5c5cfc" : "#94a3b8" }}>
                {item.icon}
              </div>
              {item.label}
              {activeTab === item.id && (
                <div style={{ marginLeft: "auto", fontSize: "1rem" }}>›</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "auto", padding: "24px" }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            padding: "12px",
            background: "transparent",
            color: "#94a3b8",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            fontWeight: "500",
            fontSize: "0.9rem",
            transition: "color 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "white"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
