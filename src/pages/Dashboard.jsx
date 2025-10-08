import React, { useState } from "react";
import "./Dashboard.css";
import BalanceSummary from "../components/BalanceSummary";
import ChartView from "../components/ChartView";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // default tab

  return (
    <div className="dashboard-layout">
      {/* Navigation Buttons */}
      <div className="tabs">
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={activeTab === "charts" ? "active" : ""}
          onClick={() => setActiveTab("charts")}
        >
          Charts
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "dashboard" && (
        <div>
          <BalanceSummary />
          <TransactionForm />
          <TransactionList />
        </div>
      )}

      {activeTab === "charts" && <ChartView />}
    </div>
  );
};

export default Dashboard;
