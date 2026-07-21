import React from "react";
import { User, Lock, Save } from "lucide-react";

const Settings = ({ user }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile settings saved! (Mock)");
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "1.8rem" }}>Settings</h1>
        <p style={{ color: "var(--text-muted)" }}>Manage your account preferences and profile details.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Profile Card */}
        <div className="card-panel">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px", marginBottom: "20px" }}>
            <User size={20} color="#5c5cfc" />
            <h3 style={{ margin: 0 }}>Public Profile</h3>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(92, 92, 252, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#5c5cfc", fontSize: "2rem", fontWeight: "bold" }}>
                {user?.name ? user.name.substring(0,2).toUpperCase() : "US"}
              </div>
              <div>
                <button type="button" className="btn-outline" style={{ padding: "8px 16px", fontSize: "0.85rem", marginBottom: "8px" }}>Change Avatar</button>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Full Name</label>
                <input type="text" defaultValue={user?.name} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Email Address</label>
                <input type="email" defaultValue={user?.email} disabled style={{ background: "#f9fafb", cursor: "not-allowed" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Position</label>
                <input type="text" defaultValue={user?.role === "ADMIN" ? "Administrator" : "Employee"} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Bio</label>
                <input type="text" placeholder="Write a short bio..." />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Security Card */}
        <div className="card-panel">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px", marginBottom: "20px" }}>
            <Lock size={20} color="#ef4444" />
            <h3 style={{ margin: 0 }}>Security</h3>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Current Password</label>
              <input type="password" required />
            </div>
            
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>New Password</label>
                <input type="password" required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Confirm New Password</label>
                <input type="password" required />
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button type="submit" className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                Update Password
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Settings;
