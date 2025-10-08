import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";
import "./TransactionForm.css";


const TransactionForm = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState (new Date().toISOString().split("T")[0]);

  // const categories = ["Food", "Grocery", "Travel", "Shopping", "Bills", "Salary", "Fuel", "other"]

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };


    dispatch(addTransaction(newTransaction));

    // reset fields
    setText("");
    setAmount("");
    setType("income");
    setCategory("Other");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="transaction-form-container">
      <div className="transaction-form">
        <form onSubmit={handleSubmit}>
      <input 
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)} 
      />
      <input
        type="text"
        placeholder="Enter transaction detail"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Grocery">Grocery</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Salary">Salary</option>
        <option value="Fuel">Fuel</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
