import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "rsuite";
import "../../node_modules/rsuite/dist/styles/rsuite-default.min.css";
import "../stylesheets/login.css";

const Login = () => {
  const [details, setDetails] = useState({});

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", details).then((res) => {
      if (res.data.errors) {
        Alert.error(res.data.errors, 4000);
      }
      if (res.data.success) {
        Alert.success(res.data.success, 4000);
        localStorage.setItem("token", res.data.responce.token);
        window.location = "/";
      }
    });
  };

  useEffect(() => {
    document.title = "Login";
    localStorage.clear();
  }, []);

  return (
    <div className="login-container">
      <div className="sub-container flex shadow">
        <div className="vector"></div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 style={{ color: "#1492ed" }} className="h1">
            Hello, Welcome back
          </h3>
          <div className="input-action-fields">
            <input
              className="input form-input"
              type="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Email"
            />
            <input
              className="input form-input"
              type="password"
              name="password"
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>
          <input className="btn login-btn" type="submit" value="Login" />
          <div className="link">
            <a href="/signup" className="new-user-query">
              Create Account
            </a>
          </div>
          <i className="rs-icon"></i>
        </form>
      </div>
    </div>
  );
};

export default Login;
