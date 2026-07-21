import React, { useState } from "react";
import Sidebar from "./Sidebar";
import EmployeeDashboardOverview from "./EmployeeDashboardOverview";
import Attendance from "./Attendance";
import LeaveManagement from "./LeaveManagement";
import Payslips from "./Payslips";
import Settings from "./Settings";

const EmployeeDashboard = ({ user, onLogout, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <EmployeeDashboardOverview user={user} setActiveTab={setActiveTab} />;
      case "attendance":
        return <Attendance user={user} />;
      case "leave":
        return <LeaveManagement user={user} />;
      case "payslips":
        return <Payslips user={user} />;
      case "settings":
        return <Settings user={user} onUpdateUser={onUpdateUser} />;
      default:
        return <EmployeeDashboardOverview user={user} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={onLogout} 
      />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
