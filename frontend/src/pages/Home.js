import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "80vh",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
  };

  return (
    <div style={backgroundStyle}>
      <h1 className="mb-3">Welcome to Task Manager App</h1>
      <p className="mb-4 fs-4 text-center" style={{ maxWidth: "600px" }}>
        Manage your tasks efficiently and stay organized with our easy-to-use task management app.
      </p>
      <div className="d-flex gap-3">
        <Link to="/login" className="btn btn-primary btn-lg">
          Login
        </Link>
        <Link to="/signup" className="btn btn-primary btn-lg">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Home;

