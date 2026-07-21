import React, { useState, useRef } from "react";
import { User, Lock, Save, Camera, CheckCircle, AlertCircle } from "lucide-react";

const Settings = ({ user, onUpdateUser }) => {
  const fileInputRef = useRef(null);
  
  // Profile state
  const [name, setName] = useState(user?.name || (user?.firstName ? `${user.firstName} ${user.lastName}` : ""));
  const [position, setPosition] = useState(user?.position || (user?.role === "ADMIN" ? "Administrator" : "Employee"));
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [profileMsg, setProfileMsg] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secMsg, setSecMsg] = useState(null);
  const [secLoading, setSecLoading] = useState(false);

  // Handle avatar image selection
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800 * 1024) {
        alert("File size exceeds 800KB. Please choose a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setAvatar(base64Image);
        if (onUpdateUser) {
          onUpdateUser({ avatar: base64Image });
        }
        setProfileMsg({ type: "success", text: "Avatar updated successfully!" });
        setTimeout(() => setProfileMsg(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile submission handler
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg(null);

    try {
      let targetId = user?.id;

      // Auto-resolve user ID by email if missing from current session
      if (!targetId && user?.email) {
        const byEmailRes = await fetch(`/api/employees/by-email?email=${encodeURIComponent(user.email)}`);
        if (byEmailRes.ok) {
          const resolvedUser = await byEmailRes.json();
          targetId = resolvedUser.id;
        }
      }

      if (targetId) {
        const res = await fetch(`/api/employees/${targetId}/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, position, bio })
        });
        
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Failed to update profile on backend");
        }
      }

      // Update state in application and localStorage
      if (onUpdateUser) {
        onUpdateUser({
          id: targetId || user?.id,
          name,
          firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" "),
          position,
          bio,
          avatar
        });
      }

      setProfileMsg({ type: "success", text: "Profile settings saved successfully!" });
    } catch (err) {
      console.error(err);
      setProfileMsg({ type: "error", text: err.message || "Error saving profile. Please try again." });
    } finally {
      setProfileLoading(false);
      setTimeout(() => setProfileMsg(null), 4000);
    }
  };

  // Password change submission handler
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSecLoading(true);
    setSecMsg(null);

    if (newPassword !== confirmPassword) {
      setSecMsg({ type: "error", text: "New passwords do not match." });
      setSecLoading(false);
      return;
    }

    if (newPassword.length < 3) {
      setSecMsg({ type: "error", text: "New password must be at least 3 characters." });
      setSecLoading(false);
      return;
    }

    try {
      let targetId = user?.id;

      if (!targetId && user?.email) {
        const byEmailRes = await fetch(`/api/employees/by-email?email=${encodeURIComponent(user.email)}`);
        if (byEmailRes.ok) {
          const resolvedUser = await byEmailRes.json();
          targetId = resolvedUser.id;
        }
      }

      if (targetId) {
        const res = await fetch(`/api/employees/${targetId}/password`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oldPassword: currentPassword, newPassword })
        });

        if (res.ok) {
          setSecMsg({ type: "success", text: "Password updated successfully!" });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          const errorText = await res.text();
          setSecMsg({ type: "error", text: errorText || "Incorrect current password." });
        }
      } else {
        setSecMsg({ type: "error", text: "Could not find user account to update password." });
      }
    } catch (err) {
      console.error(err);
      setSecMsg({ type: "error", text: "Error updating password. Please try again." });
    } finally {
      setSecLoading(false);
      setTimeout(() => setSecMsg(null), 4000);
    }
  };

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "US";

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

          {profileMsg && (
            <div style={{ 
              padding: "12px 16px", 
              borderRadius: "8px", 
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "0.9rem",
              background: profileMsg.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              color: profileMsg.type === "success" ? "#10b981" : "#ef4444"
            }}>
              {profileMsg.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {profileMsg.text}
            </div>
          )}
          
          <form onSubmit={handleProfileSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div style={{ position: "relative", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(92, 92, 252, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#5c5cfc", fontSize: "2rem", fontWeight: "bold", overflow: "hidden", border: "2px solid var(--border-color)" }}>
                {avatar ? (
                  <img src={avatar} alt="Profile Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  initials
                )}
              </div>
              <div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  style={{ display: "none" }} 
                  onChange={handleAvatarChange} 
                />
                <button 
                  type="button" 
                  className="btn-outline" 
                  onClick={handleAvatarClick} 
                  style={{ padding: "8px 16px", fontSize: "0.85rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Camera size={14} /> Change Avatar
                </button>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Email Address</label>
                <input 
                  type="email" 
                  value={user?.email || "admin@me.com"} 
                  disabled 
                  style={{ background: "#f9fafb", cursor: "not-allowed" }} 
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Position</label>
                <input 
                  type="text" 
                  value={position} 
                  onChange={(e) => setPosition(e.target.value)} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Bio</label>
                <input 
                  type="text" 
                  placeholder="Write a short bio..." 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button type="submit" className="btn-primary" disabled={profileLoading} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Save size={16} /> {profileLoading ? "Saving..." : "Save Changes"}
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

          {secMsg && (
            <div style={{ 
              padding: "12px 16px", 
              borderRadius: "8px", 
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "0.9rem",
              background: secMsg.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              color: secMsg.type === "success" ? "#10b981" : "#ef4444"
            }}>
              {secMsg.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {secMsg.text}
            </div>
          )}
          
          <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Current Password</label>
              <input 
                type="password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                required 
              />
            </div>
            
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>New Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button type="submit" className="btn-outline" disabled={secLoading} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {secLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Settings;
