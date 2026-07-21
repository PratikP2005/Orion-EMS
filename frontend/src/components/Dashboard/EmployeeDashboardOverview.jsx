import React from "react";
import { Clock, Calendar, AlertCircle } from "lucide-react";

const EmployeeDashboardOverview = ({ user, setActiveTab }) => {
  return (
    <div>
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem" }}>Employee Dashboard</h1>
          <p style={{ color: "var(--text-muted)" }}>Welcome back, {user?.name || "Employee"}.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            className="btn-outline" 
            onClick={() => setActiveTab("leave")}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Calendar size={16} />
            Apply for Leave
          </button>
          <button 
            className="btn-primary" 
            onClick={() => setActiveTab("attendance")}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Clock size={16} />
            Mark Attendance
          </button>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <h3>Days Present</h3>
            <div className="value">0</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>This Month</div>
          </div>
          <div className="icon-wrapper" style={{ color: "#10b981", background: "rgba(16, 185, 129, 0.1)" }}>
            <Clock size={20} />
          </div>
        </div>
        
        <div className="stat-card">
          <div>
            <h3>Late Arrivals</h3>
            <div className="value">0</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>This Month</div>
          </div>
          <div className="icon-wrapper" style={{ color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)" }}>
            <AlertCircle size={20} />
          </div>
        </div>
        
        <div className="stat-card">
          <div>
            <h3>Leave Balance</h3>
            <div className="value">0</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>Annual Leave Left</div>
          </div>
          <div className="icon-wrapper" style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)" }}>
            <Calendar size={20} />
          </div>
        </div>
      </div>
      
      <div className="card-panel">
        <h3 style={{ marginBottom: "16px" }}>Your Upcoming Tasks</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No active tasks at the moment.</p>
      </div>
    </div>
  );
};

export default EmployeeDashboardOverview;
