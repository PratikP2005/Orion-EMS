import React, { useState } from "react";
import { Download, Plus, Printer, X, FileText } from "lucide-react";

const Payslips = ({ user }) => {
  const isAdmin = user?.role === "ADMIN";
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [viewingSlip, setViewingSlip] = useState(null);

  const [slips, setSlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ employeeId: "", month: "July", year: new Date().getFullYear() });

  const fetchPayslips = async () => {
    try {
      setLoading(true);
      const url = isAdmin ? "/api/payslips" : `/api/payslips/employee/${user.id}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map(s => ({
          id: s.id,
          employeeId: `EMP-${s.employee?.id || "000"}`,
          name: s.employee ? `${s.employee.firstName || ''} ${s.employee.lastName || ''}`.trim() || s.employee.email : "Unknown",
          month: s.period.split(" ")[0],
          year: parseInt(s.period.split(" ")[1] || new Date().getFullYear()),
          basic: s.basicSalary,
          allowances: s.allowances,
          deductions: s.deductions,
          net: s.netSalary,
          status: "Paid",
          date: s.period
        }));
        setSlips(mapped);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    if (!isAdmin) return;
    try {
      const res = await fetch("/api/employees");
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      }
    } catch (e) { console.error(e); }
  };

  React.useEffect(() => {
    fetchPayslips();
    fetchEmployees();
  }, [user.id, isAdmin]);

  const handlePrint = () => {
    window.print();
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        employeeId: parseInt(formData.employeeId),
        period: `${formData.month} ${formData.year}`
      };
      const res = await fetch("/api/payslips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowGenerateModal(false);
        fetchPayslips();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="no-print">
        <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem" }}>Payroll & Payslips</h1>
            <p style={{ color: "var(--text-muted)" }}>{isAdmin ? "Manage payroll and generate employee payslips." : "View and download your monthly salary slips."}</p>
          </div>
          {isAdmin && (
            <button className="btn-primary" onClick={() => setShowGenerateModal(true)}>
              <Plus size={18} /> Generate Payslip
            </button>
          )}
        </div>

        <div className="card-panel">
          <h3 style={{ marginBottom: "20px" }}>{isAdmin ? "Recent Payroll History" : "Your Salary Slips"}</h3>
          
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  {isAdmin && <th>Employee</th>}
                  <th>Period</th>
                  <th>Net Salary</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slips.map((slip) => (
                  <tr key={slip.id}>
                    {isAdmin && <td><span style={{ fontWeight: "500" }}>{slip.name}</span></td>}
                    <td>{slip.month} {slip.year}</td>
                    <td style={{ fontWeight: "600", color: "#10b981" }}>${slip.net.toLocaleString()}</td>
                    <td>{slip.date}</td>
                    <td>
                      <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "500", background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                        {slip.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => setViewingSlip(slip)} className="btn-outline" style={{ padding: "6px 12px", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                          <FileText size={14} /> View
                        </button>
                        {!isAdmin && (
                          <button className="btn-primary" style={{ padding: "6px 12px", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }} onClick={() => setViewingSlip(slip)}>
                            <Download size={14} /> DL
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                {slips.length === 0 && !loading && (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px" }}>
                      No payslips found.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px" }}>
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payslip View/Print Modal */}
      {viewingSlip && (
        <div className="modal-overlay" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="modal-content print-area" style={{ padding: "40px", maxWidth: "800px", borderRadius: "0", background: "white" }}>
            <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginBottom: "20px" }}>
              <button className="btn-outline" onClick={handlePrint} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Printer size={16} /> Print / Save PDF
              </button>
              <button className="btn-outline" onClick={() => setViewingSlip(null)}>Close</button>
            </div>
            
            <div style={{ border: "1px solid #e5e7eb", padding: "40px", color: "#111827" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #111827", paddingBottom: "20px", marginBottom: "30px" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px 0" }}>COMPANY NAME INC.</h2>
                  <p style={{ margin: 0, color: "#4b5563" }}>123 Business Avenue, Suite 100</p>
                  <p style={{ margin: 0, color: "#4b5563" }}>Tech District, NY 10001</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <h1 style={{ fontSize: "28px", color: "#5c5cfc", margin: "0 0 8px 0", letterSpacing: "2px" }}>PAYSLIP</h1>
                  <p style={{ margin: 0, fontWeight: "600" }}>{viewingSlip.month} {viewingSlip.year}</p>
                </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
                <div>
                  <p style={{ margin: "0 0 4px 0", color: "#6b7280", fontSize: "14px" }}>Employee Name</p>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "16px" }}>{viewingSlip.name}</p>
                  
                  <p style={{ margin: "16px 0 4px 0", color: "#6b7280", fontSize: "14px" }}>Employee ID</p>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "16px" }}>{viewingSlip.employeeId}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: "0 0 4px 0", color: "#6b7280", fontSize: "14px" }}>Issue Date</p>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "16px" }}>{viewingSlip.date}</p>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "10px", marginBottom: "16px" }}>Earnings</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span>Basic Salary</span>
                    <span>${viewingSlip.basic.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span>Allowances</span>
                    <span>${viewingSlip.allowances.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "10px", marginBottom: "16px" }}>Deductions</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span>Tax & Insurance</span>
                    <span>${viewingSlip.deductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div style={{ background: "#f9fafb", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #111827" }}>
                <h3 style={{ margin: 0 }}>Net Salary</h3>
                <h2 style={{ margin: 0, color: "#10b981", fontSize: "28px" }}>${viewingSlip.net.toLocaleString()}</h2>
              </div>
              
              <div style={{ marginTop: "60px", textAlign: "center", color: "#9ca3af", fontSize: "12px", fontStyle: "italic" }}>
                This is a computer generated document and requires no signature.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Modal for Admin */}
      {showGenerateModal && (
        <div className="modal-overlay no-print">
          <div className="modal-content" style={{ padding: "30px", maxWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2>Generate Payslip</h2>
              <button onClick={() => setShowGenerateModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X /></button>
            </div>
            <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Employee</label>
                <select required value={formData.employeeId} onChange={(e) => setFormData({...formData, employeeId: e.target.value})}>
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName && emp.lastName ? `${emp.firstName} ${emp.lastName}` : emp.email}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Month</label>
                  <select required value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})}>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.9rem" }}>Year</label>
                  <input type="number" required value={formData.year} onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button type="button" className="btn-outline" onClick={() => setShowGenerateModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Generate & Notify</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payslips;
