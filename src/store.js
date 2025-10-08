import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./features/transactionsSlice";
import authreducer from "./features/authSlice";


export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    auth: authreducer
  }
});

export default store;