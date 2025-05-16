import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import TaskManager from "./pages/TaskManager";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand navbar-dark bg-primary px-3">
        <Link className="navbar-brand" to="/">TaskManager</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
          <Link className="nav-link" to="/tasks">Task Manager</Link>
        </div>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskManager />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
