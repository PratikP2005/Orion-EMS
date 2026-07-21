import React, { useState, useEffect } from "react";
import { Search, Plus, Filter, MoreVertical, X } from "lucide-react";

const AddEmployeeModal = ({ onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "",
    phoneNumber: "", joinDate: "", department: "", position: "", role: "EMPLOYEE",
    basicSalary: "", allowances: "", deductions: ""
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setLoading(true);
    try {
      // Mock full name combining since backend still uses "name" but we have getters/setters for first/last. Wait, our backend User has firstName, lastName, basicSalary etc.
      // But we just updated the model to include these. Let's send the full payload.
      const payload = {
        ...formData,
        name: formData.firstName + " " + formData.lastName // Fallback
      };
      
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        onAdded();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ padding: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2>Add New Employee {step === 1 ? "(1/2)" : "(2/2)"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>First Name</label>
                  <input type="text" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>Last Name</label>
                  <input type="text" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>Department</label>
                  <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>Position</label>
                  <input type="text" required value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>Phone Number</label>
                  <input type="text" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>Join Date</label>
                  <input type="date" required value={formData.joinDate} onChange={(e) => setFormData({...formData, joinDate: e.target.value})} />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>Basic Salary</label>
                  <input type="number" required value={formData.basicSalary} onChange={(e) => setFormData({...formData, basicSalary: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>System Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>Email Login</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "6px" }}>Password</label>
                  <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
            {step === 2 && (
              <button type="button" className="btn-outline" onClick={() => setStep(1)}>Back</button>
            )}
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Processing..." : step === 1 ? "Next" : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/employees");
      if (res.ok) {
        const data = await res.json();
        const mappedData = data.map(emp => ({
          ...emp,
          name: emp.firstName && emp.lastName ? `${emp.firstName} ${emp.lastName}` : emp.firstName || emp.email
        }));
        setEmployees(mappedData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdded = () => {
    setShowModal(false);
    fetchEmployees();
  };

  const filteredEmployees = employees.filter(e => 
    (e.name || "").toLowerCase().includes(search.toLowerCase()) || 
    (e.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem" }}>Employees</h1>
          <p style={{ color: "var(--text-muted)" }}>Manage your workforce directory.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add Employee
        </button>
      </div>

      <div className="card-panel" style={{ marginBottom: "20px", display: "flex", gap: "16px", padding: "16px" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "40px" }} 
          />
        </div>
        <button className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Filter size={18} /> Filters
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>Loading employees...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {filteredEmployees.map(emp => (
            <div key={emp.id} className="card-panel" style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "rgba(92, 92, 252, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#5c5cfc", fontWeight: "bold", fontSize: "1.2rem" }}>
                  {emp.name ? emp.name.substring(0, 2).toUpperCase() : "EM"}
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  <MoreVertical size={18} />
                </button>
              </div>
              <h3 style={{ margin: "0 0 4px 0" }}>{emp.name}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0 0 12px 0" }}>{emp.position || "Staff"} • {emp.department || "General"}</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <div>Email: <span style={{ color: "var(--text-main)" }}>{emp.email}</span></div>
                <div>Role: <span style={{ color: "var(--text-main)" }}>{emp.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} onAdded={handleAdded} />}
    </div>
  );
};

export default EmployeesList;
