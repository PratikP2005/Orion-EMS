import React from "react";
import { LogOut, LayoutDashboard, Users, Calendar, DollarSign, Settings, Clock, ChevronRight } from "lucide-react";

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
        {/* Project Branding & Logo (Clickable -> Dashboard) */}
        <div 
          onClick={() => setActiveTab("dashboard")}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            gap: "12px", 
            marginBottom: "28px", 
            cursor: "pointer" 
          }}
        >
          <img 
            src="/logo.png" 
            alt="Orion EMS Logo" 
            style={{ 
              width: "42px", 
              height: "42px", 
              borderRadius: "12px", 
              objectFit: "cover",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.4)",
              flexShrink: 0 
            }} 
          />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ color: "white", fontSize: "1.25rem", margin: 0, fontWeight: "700", letterSpacing: "-0.5px", lineHeight: "1.2" }}>Orion EMS</h2>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: "500", lineHeight: "1.2" }}>Enterprise Workforce Platform</div>
          </div>
        </div>

        {/* User Profile Card (Clickable -> Settings) */}
        <div 
          onClick={() => setActiveTab("settings")}
          title="Click to view & edit profile settings"
          style={{ 
            background: activeTab === "settings" ? "rgba(99, 102, 241, 0.2)" : "rgba(255,255,255,0.05)", 
            borderRadius: "10px", 
            padding: "14px", 
            display: "flex", 
            alignItems: "center", 
            gap: "12px", 
            marginBottom: "28px", 
            border: activeTab === "settings" ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            if (activeTab !== "settings") e.currentTarget.style.background = "rgba(255,255,255,0.09)";
          }}
          onMouseLeave={(e) => {
            if (activeTab !== "settings") e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          }}
        >
          <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(99, 102, 241, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "600", fontSize: "0.95rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}>
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              initials
            )}
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{ color: "white", fontSize: "0.9rem", fontWeight: "600", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{user?.name || user?.email}</div>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{isAdmin ? "Administrator" : "Employee"}</div>
          </div>
          <ChevronRight size={16} color="#64748b" />
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
