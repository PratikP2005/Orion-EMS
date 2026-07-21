import React from "react";
import { Tag, Calendar } from "lucide-react";

const TaskList = ({ tasks = [], onUpdateStatus }) => {
  const getCardClass = (status) => {
    switch (status) {
      case "NEW":
        return "task-card task-new";
      case "ACTIVE":
        return "task-card task-active";
      case "COMPLETED":
        return "task-card task-completed";
      case "FAILED":
        return "task-card task-failed";
      default:
        return "task-card task-new";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="tasks-section animate-fade-in">
      <h2>Assigned Tasks</h2>
      {tasks.length === 0 ? (
        <div className="glass-panel" style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
          No tasks assigned yet. Enjoy your day!
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task.id} className={getCardClass(task.status)}>
              <div>
                <div className="task-header">
                  <span className="task-tag">
                    {task.category || "General"}
                  </span>
                  <span className="task-date" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Calendar size={12} />
                    {formatDate(task.date)}
                  </span>
                </div>
                <div className="task-body">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
              </div>

              <div className="task-actions">
                {task.status === "NEW" && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(task.id, "ACTIVE")}
                      className="btn-accept"
                    >
                      Accept Task
                    </button>
                    <button
                      onClick={() => onUpdateStatus(task.id, "FAILED")}
                      className="btn-fail"
                    >
                      Fail Task
                    </button>
                  </>
                )}

                {task.status === "ACTIVE" && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(task.id, "COMPLETED")}
                      className="btn-complete"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => onUpdateStatus(task.id, "FAILED")}
                      className="btn-fail"
                    >
                      Fail Task
                    </button>
                  </>
                )}

                {(task.status === "COMPLETED" || task.status === "FAILED") && (
                  <div style={{ width: "100%", textAlign: "center", padding: "6px", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", background: "rgba(0,0,0,0.1)", borderRadius: "4px" }}>
                    Task is {task.status.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
