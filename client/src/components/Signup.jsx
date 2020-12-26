import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "rsuite";
import "../../node_modules/rsuite/dist/styles/rsuite-default.min.css";
import "../stylesheets/login.css";

const Signup = () => {
  const [details, setDetails] = useState({});

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/signup", details).then((res) => {
      if (res.data.errors) {
        Alert.error(res.data.errors, 4000);
      }
      if (res.data.success) {
        Alert.success(res.data.success, 4000);
        window.location = "/login";
      }
    });
  };

  useEffect(() => {
    document.title = "Signup";
  }, []);

  return (
    <div className="login-container signup-container">
      <div className="sub-container flex shadow">
        <div className="vector signup-vector"></div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Signup</h3>
          <div className=" input-action-fields">
            <input
              className="input form-input"
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              className="input form-input"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              className="input form-input"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input
              className="input form-input"
              type="password"
              name="confirm_password"
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
          <input className="btn login-btn" type="submit" value="Signup" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
