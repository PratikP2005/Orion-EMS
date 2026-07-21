import React from "react";
import { ListPlus, Play, CheckCircle, AlertTriangle } from "lucide-react";

const TaskStats = ({ tasks = [] }) => {
  const newTasks = tasks.filter((t) => t.status === "NEW").length;
  const activeTasks = tasks.filter((t) => t.status === "ACTIVE").length;
  const completedTasks = tasks.filter((t) => t.status === "COMPLETED").length;
  const failedTasks = tasks.filter((t) => t.status === "FAILED").length;

  return (
    <div className="stats-grid animate-fade-in">
      <div className="stat-card glass-panel new">
        <div className="stat-info">
          <h3>{newTasks}</h3>
          <p>New Tasks</p>
        </div>
        <div className="stat-icon">
          <ListPlus size={24} />
        </div>
      </div>

      <div className="stat-card glass-panel active">
        <div className="stat-info">
          <h3>{activeTasks}</h3>
          <p>Active Tasks</p>
        </div>
        <div className="stat-icon">
          <Play size={24} />
        </div>
      </div>

      <div className="stat-card glass-panel completed">
        <div className="stat-info">
          <h3>{completedTasks}</h3>
          <p>Completed Tasks</p>
        </div>
        <div className="stat-icon">
          <CheckCircle size={24} />
        </div>
      </div>

      <div className="stat-card glass-panel failed">
        <div className="stat-info">
          <h3>{failedTasks}</h3>
          <p>Failed Tasks</p>
        </div>
        <div className="stat-icon">
          <AlertTriangle size={24} />
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
