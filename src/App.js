import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Router>
      <Routes>
        {/* Protected route: only logged-in users can access dashboard */}
        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <>
                <Header />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Default redirect */}
        <Route
          path="*"
          element={<Navigate to={currentUser ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
