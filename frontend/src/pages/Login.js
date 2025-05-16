import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`);
    // Add your login logic here
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Login
        </button>
      </form>

      <div className="text-center">
        <button className="btn btn-danger w-100" onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
