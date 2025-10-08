import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction, editTransaction, setDateFilter } from "../features/transactionsSlice";
import "./TransactionList.css";
import { isToday, isYesterday, isWithinInterval, startOfMonth, endOfMonth, subDays, subMonths, } from "date-fns";
import { Download, SquarePen, Trash2, } from "lucide-react"
import { exportTransactionsToPDF } from "../utils/exportPDF";

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  console.log("transactions from Redux:", transactions);

  const [CategoryFilter, setCategoryFilter] = useState("All");
  const dateFilter = useSelector((state) => state.transactions.dateFilter);
  const dateFilters = [ "All", "Today", "Yesterday", "Last 7 Days", "This Month", "Last Month", "Last 3 Months"];

  const categories = ["All", "Food", "Grocery", "Travel", "Shopping", "Bills", "Salary", "Fuel", "Other"];

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };
  
  // Edit section
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editForm, setEditForm] = useState({ text: "", amount: "", category: "",});

  const handleEdit = (t) => {
    setEditingTransaction(t);
    setEditForm({ text: t.text, amount: t.amount, category: t.category});
  };

  const handleEditSave = () => {
    dispatch(editTransaction({ id: editingTransaction.id, updatedData: editForm}));
    setEditingTransaction(null);
  };

  // Filter 
  const filteredTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);

    // Category filter
    if (CategoryFilter !== "All" && t.category !== CategoryFilter) {
      return false;
    }

    // Date filter
    switch (dateFilter) {
      case "Today":
        return isToday(txDate);
      case "Yesterday":
        return isYesterday(txDate);
      case "Last 7 Days":
        return isWithinInterval(txDate, { start: subDays(new Date(), 7), end: new Date()});
      case "This Month":
        return isWithinInterval(txDate, { start: startOfMonth(new Date()), end: endOfMonth(new Date()) });
      case "Last Month":
        const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
        const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
        return isWithinInterval(txDate, { start: lastMonthStart, end: lastMonthEnd });
      case "Last 3 Months":
        return isWithinInterval(txDate, { start: subMonths(new Date(), 3), end: new Date() });
      default:
        return true;
    }
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff !== 0) return dateDiff;

    return new Date(b.timestamp) - new Date(a.timestamp)
  });

  return (
    <div className="transaction-list">
      <div className="list-header">
        <h2>Transaction History</h2>
        <div className="filters">
          <select value={CategoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select value={dateFilter} onChange={(e) => dispatch(setDateFilter(e.target.value))}>
            {dateFilters.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button
            className="export-btn"
            onClick={() => exportTransactionsToPDF(transactions)}
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="empty">No transactions found.</p>
      ) : (
        <div className="table-container">
          {editingTransaction && (
            <div className="edit-modal">
              <div className="edit-box">
                <h3>Edit Transaction</h3>
                <div className="edit-content">
                  <div className="left-side">
                    <p className="tag-name">Details</p>
                    <input 
                      type="text"
                      value={editForm.text}
                      onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
                      placeholder="Details"
                    />
                    <p className="tag-name">Amount</p>
                    <input 
                      type="number"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                      placeholder="Amount"
                    />
                  </div>
                  <div className="right-side">
                    <p className="tag-name">Transactions Type</p>
                    <select
                      value={editForm.type}
                      onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                    <p className="tag-name">Category</p>
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value})}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleEditSave}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditingTransaction(null)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Details</th>
                <th>Category</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((t) => (
                <tr key={t.id} className={t.type}>
                  <td>{t.date}</td>
                  <td>{t.text} {t._editedFields?.includes("text") && <span className="edited-tag">(edit)</span>}</td>
                  <td>{t.category} {t._editedFields?.includes("category") && <span className="edited-tag">(edit)</span>}</td>
                  <td>{t.type === "income" ? "+" : "-"}₹{t.amount} {t._editedFields?.includes("amount") && <span className="edited-tag">(edit)</span>}</td>
                  <td>
                    <button onClick={() => handleDelete(t.id)}><Trash2 size={14} /></button>
                    <button onClick={() => handleEdit(t)}><SquarePen size={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
