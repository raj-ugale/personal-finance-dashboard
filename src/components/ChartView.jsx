import React, { useState } from "react";
import CategoryChart from "./CategoryChart";
import ExpensesOverTimeChart from "./ExpensesOverTimeChart";
import "./ChartView.css";
import { useSelector } from "react-redux";

const ChartView = () => {
  const [chartType, setChartType] = useState("category");
  const transactions = useSelector((state) => state.transactions.transactions);

  return (
    <div>
      <div className="chart-tabs">
        <button
          className={chartType === "category" ? "active" : ""}
          onClick={() => setChartType("category")}
        >
          Category Chart
        </button>
        <button
          className={chartType === "time" ? "active" : ""}
          onClick={() => setChartType("time")}
        >
          Expenses Over Time
        </button>
      </div>

      {/* Chart */}
      {chartType === "category" && <CategoryChart transactions={transactions} />}
      {chartType === "time" && <ExpensesOverTimeChart transactions={transactions} />}
    </div>
  );
};

export default ChartView;
