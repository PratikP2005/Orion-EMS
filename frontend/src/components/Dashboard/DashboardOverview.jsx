import React, { useState, useEffect } from "react";
import { Users, Calendar, Clock, CheckSquare } from "lucide-react";

const DashboardOverview = ({ user }) => {
  const [stats, setStats] = useState({
    employees: 0,
    leaveRequests: 0,
    attendanceToday: 0,
    totalTasks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, these would be separate API calls or an aggregate endpoint
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [empRes, taskRes] = await Promise.all([
          fetch("/api/employees"),
          fetch("/api/tasks")
        ]);
        
        let employees = [];
        let tasks = [];
        if (empRes.ok) employees = await empRes.json();
        if (taskRes.ok) tasks = await taskRes.json();
        
        setStats({
          employees: employees.length,
          leaveRequests: 0,
          attendanceToday: 0,
          totalTasks: tasks.length
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) {
    return <div style={{ padding: "40px", color: "var(--text-muted)" }}>Loading overview...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "1.8rem" }}>Dashboard Overview</h1>
        <p style={{ color: "var(--text-muted)" }}>Welcome back, {user?.name || "Admin"}. Here's what's happening today.</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <h3>Total Employees</h3>
            <div className="value">{stats.employees}</div>
          </div>
          <div className="icon-wrapper" style={{ color: "#5c5cfc", background: "rgba(92, 92, 252, 0.1)" }}>
            <Users size={20} />
          </div>
        </div>
        
        <div className="stat-card">
          <div>
            <h3>Leave Requests</h3>
            <div className="value">{stats.leaveRequests}</div>
          </div>
          <div className="icon-wrapper" style={{ color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)" }}>
            <Calendar size={20} />
          </div>
        </div>
        
        <div className="stat-card">
          <div>
            <h3>Attendance Today</h3>
            <div className="value">{stats.attendanceToday}</div>
          </div>
          <div className="icon-wrapper" style={{ color: "#10b981", background: "rgba(16, 185, 129, 0.1)" }}>
            <Clock size={20} />
          </div>
        </div>
        
        <div className="stat-card">
          <div>
            <h3>Active Tasks</h3>
            <div className="value">{stats.totalTasks}</div>
          </div>
          <div className="icon-wrapper" style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)" }}>
            <CheckSquare size={20} />
          </div>
        </div>
      </div>
      
      {/* Additional admin content could go here, e.g. recent activity feed */}
      <div className="card-panel">
        <h3 style={{ marginBottom: "16px" }}>Recent Activity</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No recent activity to show.</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
