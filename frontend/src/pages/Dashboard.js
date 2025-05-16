import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <p>Welcome to your dashboard! Use the button below to manage your tasks.</p>
      <Link to="/tasks" className="btn btn-success">
        Go to Task Manager
      </Link>
    </div>
  );
}

export default Dashboard;
