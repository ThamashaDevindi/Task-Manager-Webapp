import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", formData);
      alert("User data stored in MongoDB!");
      setFormData({ fullName: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to store user data.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input name="fullName" type="text" className="form-control" value={formData.fullName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
      <p className="mt-3 text-center">
        Already have an account? <Link to="/Login">Login here</Link>
      </p>
    </div>
  );
}

export default SignUp;
