import React, { useState, useEffect } from "react";
import { Clock, CheckCircle2, History } from "lucide-react";

const Attendance = ({ user }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/attendance/employee/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        
        // Find if user is currently clocked in today
        const todayStr = new Date().toISOString().split('T')[0];
        const todayRecord = data.find(r => r.date === todayStr);
        if (todayRecord && !todayRecord.checkOut) {
          setClockedIn(true);
        } else {
          setClockedIn(false);
        }

        const mapped = data.map(r => ({
          id: r.id,
          date: r.date,
          checkIn: r.checkIn,
          checkOut: r.checkOut || "-",
          hrs: r.workingHours > 0 ? `${r.workingHours}h` : "-",
          status: r.status
        })).sort((a, b) => new Date(b.date) - new Date(a.date)); // descending date
        setHistory(mapped);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [user.id]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleClock = async () => {
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (!clockedIn) {
        // Clock In
        const payload = {
          employeeId: user.id,
          date: todayStr,
          checkIn: timeStr,
          dayType: "Office"
        };
        const res = await fetch("/api/attendance/clock-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) fetchAttendance();
      } else {
        // Clock Out
        const payload = {
          employeeId: user.id,
          date: todayStr,
          checkOut: timeStr
        };
        const res = await fetch("/api/attendance/clock-out", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) fetchAttendance();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "1.8rem" }}>Attendance Tracker</h1>
        <p style={{ color: "var(--text-muted)" }}>Manage your daily work hours and check-ins.</p>
      </div>

      <div style={{ display: "flex", gap: "30px", marginBottom: "30px", flexWrap: "wrap" }}>
        {/* Clock In Panel */}
        <div className="card-panel" style={{ flex: "1 1 300px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px" }}>
          <div style={{ fontSize: "3rem", fontWeight: "bold", fontFamily: "monospace", color: "var(--primary)", marginBottom: "8px" }}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div style={{ color: "var(--text-muted)", marginBottom: "30px", fontSize: "1.1rem" }}>
            {currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

          <button 
            onClick={handleToggleClock}
            style={{
              padding: "16px 40px",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              border: "none",
              background: clockedIn ? "#ef4444" : "#10b981",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: clockedIn ? "0 4px 14px rgba(239, 68, 68, 0.4)" : "0 4px 14px rgba(16, 185, 129, 0.4)",
              transition: "transform 0.1s ease"
            }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {clockedIn ? <CheckCircle2 size={24} /> : <Clock size={24} />}
            {clockedIn ? "Clock Out" : "Clock In"}
          </button>
          
          <div style={{ marginTop: "20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {clockedIn ? "You are currently working." : "You are currently off-the-clock."}
          </div>
        </div>

        {/* Stats Panel */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="stat-card">
            <div>
              <h3>Today's Hours</h3>
              <div className="value">{clockedIn ? "3h 45m" : "0h 0m"}</div>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <h3>Weekly Average</h3>
              <div className="value">8h 12m</div>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <h3>Overtime</h3>
              <div className="value">2h 30m</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-panel">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <History size={20} color="var(--text-muted)" />
          <h3 style={{ margin: 0 }}>Attendance Log</h3>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Work Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record.id}>
                  <td style={{ fontWeight: "500" }}>{record.date}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut}</td>
                  <td>{record.hrs}</td>
                  <td>
                    <span style={{ 
                      padding: "4px 10px", 
                      borderRadius: "20px", 
                      fontSize: "0.8rem", 
                      fontWeight: "500",
                      background: record.status === 'Present' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: record.status === 'Present' ? '#10b981' : '#f59e0b'
                    }}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
              {history.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px" }}>
                    No attendance records found.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px" }}>
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
