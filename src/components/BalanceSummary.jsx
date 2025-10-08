import React from "react";
import { useSelector } from "react-redux";
import "./BalanceSummary.css";

const BalanceSummary = () => {
  const transactions = useSelector(state => state.transactions.transactions);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expenses;

  return (
    <div className="balance-summary">
      <div className="summary-card income">
        <h3>Income</h3>
        <p>₹{income.toFixed(2)}</p>
      </div>
      <div className="summary-card expenses">
        <h3>Expenses</h3>
        <p>₹{expenses.toFixed(2)}</p>
      </div>
      <div className="summary-card balance">
        <h3>Balance</h3>
        <p>₹{balance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BalanceSummary;
