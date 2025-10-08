import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ExpensesOverTimeChart = () => {
  const transactions = useSelector(
    (state) => state.transactions.transactions || []
  );

  // Filter only expenses
  const expenses = transactions.filter((t) => t.type === "expense");

  // Group expenses by date
  const expenseTotals = expenses.reduce((acc, t) => {
    const date = t.date; // already stored in your slice
    acc[date] = (acc[date] || 0) + Number(t.amount);
    return acc;
  }, {});

  // Convert object → array for recharts
  const data = Object.entries(expenseTotals).map(([date, value]) => ({
    date,
    amount: value,
  }));

  return (
    <div className="chart-card">
      <h2>Expenses Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#FF7043" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesOverTimeChart;
