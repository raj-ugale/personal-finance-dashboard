import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Load transactions from localStorage if available
const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

const initialState = {
  transactions: storedTransactions,
  dateFilter: "all"
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = { 
        id: uuidv4(), 
        text: action.payload.text, 
        amount: action.payload.amount, 
        type: action.payload.type, 
        category: action.payload.category, 
        date: new Date(action.payload.date).toISOString().split("T")[0],
        timestamp: new Date().toISOString(), 
      };
      state.transactions.push(newTransaction);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    editTransaction: (state, action) => {
      const { id, updatedData } = action.payload || {};
      const index = state.transactions.findIndex((t) => t.id === id);
      if (index !== -1 && updatedData && typeof updatedData === "object") {
        // Compare fields to se which changed
        const old = state.transactions[index];
        const newData = { ...old, ...updatedData, };

        // Identify only the field that actually changed\
        const changedFields = Object.keys(updatedData).filter(
          (key) => updatedData[key] !== old[key]
        );

        if (changedFields.length > 0) {
          newData.edited = true;
          newData._editedFields = changedFields;
        }

        // Mark which fields were edited
        // newData._editedFields = Object.keys(updatedData);

        state.transactions[index] = newData;
        localStorage.setItem("transactions", JSON.stringify(state.transactions));
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    loadTransactions: (state, action) => {
      state.transactions = action.payload;
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
  }
});

export const { addTransaction, editTransaction, deleteTransaction, loadTransactions, setDateFilter } = transactionsSlice.actions;
export default transactionsSlice.reducer;
