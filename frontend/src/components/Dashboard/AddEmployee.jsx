import React, { useState } from "react";
import { UserPlus, User, Mail, Lock, UserCheck } from "lucide-react";

const AddEmployee = ({ onAddEmployee }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage({ text: "Please fill in all fields.", type: "danger" });
      return;
    }
    setMessage({ text: "", type: "" });
    setSubmitting(true);

    try {
      await onAddEmployee({ name, email, password });
      setMessage({ text: "Employee registered successfully!", type: "success" });
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage({ text: err.message || "Failed to register employee.", type: "danger" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: "28px" }}>
      <h2 className="form-title">
        <UserPlus size={22} style={{ color: "var(--primary)" }} />
        Register New Employee
      </h2>

      {message.text && (
        <div className={`badge ${message.type === "success" ? "badge-success" : "badge-danger"}`} style={{ display: "flex", gap: "6px", width: "100%", padding: "10px 14px", borderRadius: "8px", marginBottom: "20px", textTransform: "none", fontWeight: "normal" }}>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="form-group" style={{ marginBottom: "0" }}>
          <label htmlFor="emp-name">Full Name</label>
          <div style={{ position: "relative" }}>
            <User size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-secondary)" }} />
            <input
              id="emp-name"
              type="text"
              placeholder="E.g., Priya Nair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ paddingLeft: "40px" }}
              disabled={submitting}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "0" }}>
          <label htmlFor="emp-email">Email Address</label>
          <div style={{ position: "relative" }}>
            <Mail size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-secondary)" }} />
            <input
              id="emp-email"
              type="email"
              placeholder="E.g., priya@me.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: "40px" }}
              disabled={submitting}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "0" }}>
          <label htmlFor="emp-password">Password</label>
          <div style={{ position: "relative" }}>
            <Lock size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-secondary)" }} />
            <input
              id="emp-password"
              type="password"
              placeholder="Enter temporary password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: "40px" }}
              disabled={submitting}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px", gap: "8px" }} disabled={submitting}>
          <UserCheck size={16} />
          {submitting ? "Registering..." : "Register Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
