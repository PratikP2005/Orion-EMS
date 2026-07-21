import React, { useState } from "react";
import { Calendar, Plus, Check, X } from "lucide-react";

const LeaveManagement = ({ user }) => {
  const isAdmin = user?.role === "ADMIN";
  const [showModal, setShowModal] = useState(false);
  
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ type: "", startDate: "", endDate: "", reason: "" });

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const url = isAdmin ? "/api/leaves" : `/api/leaves/employee/${user.id}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map(l => {
          let sDate = "", eDate = "";
          if (l.dates) {
            const parts = l.dates.split(" to ");
            sDate = parts[0];
            eDate = parts.length > 1 ? parts[1] : parts[0];
          }
          return {
            id: l.id,
            employeeName: l.employee ? `${l.employee.firstName || ''} ${l.employee.lastName || ''}`.trim() || l.employee.email : "Unknown",
            type: l.type,
            startDate: sDate,
            endDate: eDate,
            status: l.status.charAt(0).toUpperCase() + l.status.slice(1).toLowerCase(),
            reason: l.reason
          };
        });
        setLeaves(mapped);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchLeaves();
  }, [user.id, isAdmin]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/leaves/${id}/status?status=${newStatus}`, { method: "PATCH" });
      if (res.ok) {
        fetchLeaves();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        employeeId: user.id,
        type: formData.type,
        dates: `${formData.startDate} to ${formData.endDate}`,
        reason: formData.reason
      };
      const res = await fetch("/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ type: "", startDate: "", endDate: "", reason: "" });
        fetchLeaves();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem" }}>Leave Management</h1>
          <p style={{ color: "var(--text-muted)" }}>{isAdmin ? "Review and manage employee leave requests." : "Manage your leave requests and balances."}</p>
        </div>
        {!isAdmin && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Apply for Leave
          </button>
        )}
      </div>

      {!isAdmin && (
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <h3>Annual Leave</h3>
              <div className="value">12<span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>/20</span></div>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <h3>Sick Leave</h3>
              <div className="value">4<span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>/10</span></div>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <h3>Casual Leave</h3>
              <div className="value">2<span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>/5</span></div>
            </div>
          </div>
        </div>
      )}

      <div className="card-panel">
        <h3 style={{ marginBottom: "20px" }}>{isAdmin ? "Recent Leave Requests" : "Your Leave History"}</h3>
        
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                {isAdmin && <th>Employee</th>}
                <th>Leave Type</th>
                <th>Duration</th>
                <th>Reason</th>
                <th>Status</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  {isAdmin && <td><span style={{ fontWeight: "500" }}>{leave.employeeName}</span></td>}
                  <td>{leave.type}</td>
                  <td>{leave.startDate} to {leave.endDate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span style={{ 
                      padding: "4px 10px", 
                      borderRadius: "20px", 
                      fontSize: "0.8rem", 
                      fontWeight: "500",
                      background: leave.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 
                                 leave.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: leave.status === 'Approved' ? '#10b981' : 
                             leave.status === 'Rejected' ? '#ef4444' : '#f59e0b'
                    }}>
                      {leave.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td>
                      {leave.status === 'Pending' ? (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => handleStatusUpdate(leave.id, 'Approved')} style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "none", padding: "6px", borderRadius: "6px", cursor: "pointer" }}><Check size={16} /></button>
                          <button onClick={() => handleStatusUpdate(leave.id, 'Rejected')} style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "none", padding: "6px", borderRadius: "6px", cursor: "pointer" }}><X size={16} /></button>
                        </div>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Resolved</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {leaves.length === 0 && !loading && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 4} style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px" }}>
                    No leave records found.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 4} style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px" }}>
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: "30px", maxWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2>Apply for Leave</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X /></button>
            </div>
            <form onSubmit={handleApply} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Leave Type</label>
                <select required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                  <option value="">Select Type</option>
                  <option value="Annual">Annual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Casual">Casual Leave</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Start Date</label>
                  <input type="date" required value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>End Date</label>
                  <input type="date" required value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Reason for Leave</label>
                <textarea rows="3" required placeholder="Provide a brief explanation..." value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})}></textarea>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
