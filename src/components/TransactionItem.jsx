import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const users = JSON.parse(localStorage.getItem("users")) || [];

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: storedUser,
    users: users,
    error: null,
  },
  reducers: {
    registerUser: (state, action) => {
      const { username, password } = action.payload;
      const existingUser = state.users.find((u) => u.username === username);
      if (existingUser) {
        state.error = "Username already exists";
        return;
      }
      const newUser = { username, password };
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
      state.error = null;
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        state.error = null;
      } else {
        state.error = "Invalid username or password";
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer;
