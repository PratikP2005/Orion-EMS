import React, { useState } from "react";
import { Users, ClipboardList } from "lucide-react";

const AllTasks = ({ employees = [] }) => {
  const [expandedEmployeeId, setExpandedEmployeeId] = useState(null);

  // Border colors matching the Figma mock style
  const borderColors = ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#a855f7'];

  const toggleExpand = (empId) => {
    if (expandedEmployeeId === empId) {
      setExpandedEmployeeId(null);
    } else {
      setExpandedEmployeeId(empId);
    }
  };

  const getTaskStats = (tasks = []) => {
    const stats = { new: 0, active: 0, completed: 0, failed: 0 };
    tasks.forEach((t) => {
      if (t.status === "NEW") stats.new++;
      else if (t.status === "ACTIVE") stats.active++;
      else if (t.status === "COMPLETED") stats.completed++;
      else if (t.status === "FAILED") stats.failed++;
    });
    return stats;
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "NEW":
        return "badge-info";
      case "ACTIVE":
        return "badge-warning";
      case "COMPLETED":
        return "badge-success";
      case "FAILED":
        return "badge-danger";
      default:
        return "badge-info";
    }
  };

  return (
    <div className="glass-panel table-panel animate-fade-in" style={{ height: "100%" }}>
      <h2 className="form-title" style={{ marginBottom: "6px" }}>
        <Users size={20} style={{ color: "var(--primary)", verticalAlign: "middle", marginRight: "8px" }} />
        Employee Tasks Overview
      </h2>
      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
        Click on an employee row to view their individual task logs.
      </p>

      <div className="table-wrapper">
        {/* Header Row */}
        <div className="alltasks-header-row">
          <div style={{ width: "30%" }}>Employee Name</div>
          <div style={{ width: "15%", textAlign: "center" }}>New</div>
          <div style={{ width: "15%", textAlign: "center" }}>Active</div>
          <div style={{ width: "15%", textAlign: "center" }}>Completed</div>
          <div style={{ width: "15%", textAlign: "center" }}>Failed</div>
        </div>

        {/* Employee Card Rows */}
        {employees.length === 0 ? (
          <div className="glass-panel" style={{ padding: "20px", textAlign: "center", color: "var(--text-secondary)" }}>
            No employees found.
          </div>
        ) : (
          employees.map((emp, idx) => {
            const stats = getTaskStats(emp.tasks);
            const isExpanded = expandedEmployeeId === emp.id;
            const rowBorderColor = borderColors[idx % borderColors.length];

            return (
              <div key={emp.id} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <div
                  className="alltasks-row"
                  onClick={() => toggleExpand(emp.id)}
                  style={{
                    borderWidth: "1.5px",
                    borderColor: rowBorderColor,
                  }}
                >
                  <div style={{ width: "30%", fontWeight: "700" }}>{emp.name}</div>
                  <div style={{ width: "15%", textAlign: "center", color: "#3b82f6", fontWeight: "700" }}>{stats.new}</div>
                  <div style={{ width: "15%", textAlign: "center", color: "#eab308", fontWeight: "700" }}>{stats.active}</div>
                  <div style={{ width: "15%", textAlign: "center", color: "#10b981", fontWeight: "700" }}>{stats.completed}</div>
                  <div style={{ width: "15%", textAlign: "center", color: "#ef4444", fontWeight: "700" }}>{stats.failed}</div>
                </div>

                {isExpanded && (
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.01)",
                      border: "1px solid var(--border-color)",
                      borderTop: "none",
                      borderRadius: "0 0 var(--radius-sm) var(--radius-sm)",
                      padding: "20px",
                      marginBottom: "8px",
                      marginTop: "-3px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <h4 style={{ fontSize: "0.85rem", color: "var(--text-primary)", display: "flex", gap: "6px", alignItems: "center", fontWeight: "600" }}>
                        <ClipboardList size={14} style={{ color: "var(--primary)" }} />
                        Tasks assigned to {emp.name}:
                      </h4>
                      {emp.tasks && emp.tasks.length > 0 ? (
                        <div style={{ display: "grid", gap: "8px", marginTop: "8px" }}>
                          {emp.tasks.map((task) => (
                            <div
                              key={task.id}
                              style={{
                                background: "var(--bg-input)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "4px",
                                padding: "10px 14px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                <div style={{ fontWeight: "700", fontSize: "0.85rem", color: "var(--text-primary)" }}>{task.title}</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>{task.description}</div>
                                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>Due Date: {task.date}</div>
                              </div>
                              <span className={`badge ${getBadgeClass(task.status)}`}>
                                {task.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                          No tasks assigned to this employee.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllTasks;
