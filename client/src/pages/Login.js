import React, { useState, useEffect } from "react";
import api from '../services/api/api';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasLoggedIn) {
      const checkToken = async () => {
        try {
          console.log("Checking for access token...");
          const response = await api.get('/api/upstox/getAccessToken', {
            headers: { 'x-username': username },
          });
          console.log("Token check response:", response.data);
          if (response.data.message !== "No token found") {
            navigate("/dashboard");
          } else {
            generateToken();
          }
        } catch (err) {
          console.error("Error checking access token:", err);
          alert("Failed to check access token. Please try again.");
        }
      };
      checkToken();
    }
  }, [hasLoggedIn, navigate, username]);

  const generateToken = () => {
    const authUrl = `${process.env.REACT_APP_UPSTOX_BASE_URL}/login/authorization/dialog?client_id=${process.env.REACT_APP_UPSTOX_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_UPSTOX_REDIRECT_URI}&response_type=${process.env.REACT_APP_UPSTOX_RESPONSE_TYPE}`;
    console.log("Redirecting to Upstox for authentication:", authUrl);
    window.location.href = authUrl;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked, attempting to authenticate:", { username, password });
    try {
      const { data } = await api.post('/api/auth/login', { username, password });
      console.log("Login response:", data);
      if (data.hasOwnProperty("error")) {
        alert("Not a valid user");
        return;
      }
      sessionStorage.setItem("user", data.username);
      setHasLoggedIn(true);
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      alert("Username or password is not correct! Please try again");
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
                  Login
                </h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-3 mb-md-4">
                    <label
                      htmlFor="username"
                      className="form-label"
                      style={{ color: "#555", fontWeight: "500" }}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
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
                  </div>
                  <div className="mb-3 mb-md-4">
                    <label
                      htmlFor="password"
                      className="form-label"
                      style={{ color: "#555", fontWeight: "500" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
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
                  </div>
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
                    Login
                  </Button>
                  <p
                    className="text-center mt-3"
                    style={{
                      color: "#666",
                      fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    }}
                  >
                    Don’t have an account?{" "}
                    <a
                      href="/signup"
                      style={{
                        color: "#1e3c72",
                        textDecoration: "none",
                        fontWeight: "500",
                      }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;