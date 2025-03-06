import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

interface LoginResponse {
  token: string;
  user: Record<string, any>;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:4000/auth/login",
        {
          email,
          password,
        }
      );


      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role); 
      localStorage.setItem("email", response.data.user.email);

      navigate("/tickets");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Tour Management System</h1>
        <h2>Customer Support Portal</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
