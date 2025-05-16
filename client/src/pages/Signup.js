import React, { useState } from "react";
import api from '../services/api/api';
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/signup', {
        username,
        password,
        email,
      });
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/");
      } else {
        alert("Something went wrong! Please try again");
      }
    } catch (err) {
      console.error("Signup error:", err.response ? err.response.data : err.message);
      alert("Failed to create user. Username or email may already exist. Please try again with new credentials.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-7">
            <div
              className="card shadow-lg p-3 p-md-4 rounded-5"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                maxWidth: "900px",
                width: "100%",
              }}
            >
              <div className="card-body">
                <h1
                  className="text-center mb-3 mb-md-4"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    fontWeight: "bold",
                    color: "#1e3c72",
                    letterSpacing: "1px",
                  }}
                >
                  Trading Bot
                </h1>
                <h2
                  className="text-center mb-3 mb-md-4"
                  style={{
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </h2>
                <Form onSubmit={handleSignup}>
                  <Form.Group className="mb-3 mb-md-4">
                    <Form.Label style={{ color: "#555", fontWeight: "500" }}>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter your username"
                      style={{
                        borderRadius: "8px",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#1e3c72";
                        e.target.style.boxShadow = "0 0 5px rgba(30, 60, 114, 0.5)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 mb-md-4">
                    <Form.Label style={{ color: "#555", fontWeight: "500" }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      style={{
                        borderRadius: "8px",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#1e3c72";
                        e.target.style.boxShadow = "0 0 5px rgba(30, 60, 114, 0.5)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 mb-md-4">
                    <Form.Label style={{ color: "#555", fontWeight: "500" }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      style={{
                        borderRadius: "8px",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#1e3c72";
                        e.target.style.boxShadow = "0 0 5px rgba(30, 60, 114, 0.5)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-2"
                    style={{
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
                      border: "none",
                      fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                      fontWeight: "500",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.02)";
                      e.target.style.boxShadow = "0 5px 15px rgba(30, 60, 114, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    Sign Up
                  </Button>
                  <p
                    className="text-center mt-3"
                    style={{
                      color: "#666",
                      fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    }}
                  >
                    Already have an account?{" "}
                    <a
                      href="/"
                      style={{
                        color: "#1e3c72",
                        textDecoration: "none",
                        fontWeight: "500",
                      }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      Login
                    </a>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;