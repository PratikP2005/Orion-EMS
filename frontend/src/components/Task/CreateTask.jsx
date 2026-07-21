import React, { useState } from "react";
import { PlusCircle, User, Calendar, Tag, FileText, Send } from "lucide-react";

const CreateTask = ({ employees = [], onCreateTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !category || !employeeId) {
      setMessage({ text: "Please fill in all fields.", type: "danger" });
      return;
    }
    setMessage({ text: "", type: "" });
    setSubmitting(true);

    try {
      await onCreateTask({
        title,
        description,
        date,
        category,
        employeeId: parseInt(employeeId, 10),
      });

      setMessage({ text: "Task created successfully!", type: "success" });
      setTitle("");
      setDescription("");
      setDate("");
      setCategory("");
      setEmployeeId("");
    } catch (err) {
      setMessage({ text: err.message || "Failed to create task.", type: "danger" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: "28px" }}>
      <h2 className="form-title">
        <PlusCircle size={22} style={{ color: "var(--primary)" }} />
        Create New Task
      </h2>

      {message.text && (
        <div className={`badge ${message.type === "success" ? "badge-success" : "badge-danger"}`} style={{ display: "flex", gap: "6px", width: "100%", padding: "10px 14px", borderRadius: "8px", marginBottom: "20px", textTransform: "none", fontWeight: "normal" }}>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="form-group" style={{ marginBottom: "0" }}>
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            type="text"
            placeholder="E.g., Design Landing Page"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "0" }}>
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            placeholder="Provide details about the task..."
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting}
            style={{ resize: "none" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="form-group" style={{ marginBottom: "0" }}>
            <label htmlFor="task-date">Due Date</label>
            <input
              id="task-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "0" }}>
            <label htmlFor="task-cat">Category</label>
            <input
              id="task-cat"
              type="text"
              placeholder="E.g., UI, Dev, QA"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={submitting}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "0" }}>
          <label htmlFor="assign-to">Assign To</label>
          <select
            id="assign-to"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            disabled={submitting}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px", gap: "8px" }} disabled={submitting}>
          <Send size={16} />
          {submitting ? "Creating..." : "Assign Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
