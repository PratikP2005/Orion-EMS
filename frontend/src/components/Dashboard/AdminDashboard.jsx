import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardOverview from "./DashboardOverview";
import EmployeesList from "./EmployeesList";
import LeaveManagement from "./LeaveManagement";
import Payslips from "./Payslips";
import Settings from "./Settings";

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview user={user} />;
      case "employees":
        return <EmployeesList user={user} />;
      case "leave":
        return <LeaveManagement user={user} />;
      case "payslips":
        return <Payslips user={user} />;
      case "settings":
        return <Settings user={user} />;
      default:
        return <DashboardOverview user={user} />;
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

export default AdminDashboard;
