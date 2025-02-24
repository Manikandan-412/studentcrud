import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await axios.post("https://studentcrud-gi2u.onrender.com/user/login", {
          email: formData.email,
          password: formData.password,
        });
        navigate("/home");
        window.alert("Login Successfully");
        console.log(response.data);
      } catch (error) {
        console.log("Login failed:");
        alert("Login failed. Please check your credentials.");
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        window.alert("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post(
          "https://studentcrud-gi2u.onrender.com/user/addData",
          formData
        );
        console.log(response.data);
        window.alert("User registration successful");
        navigate("/home");
      } catch (error) {
        console.error("Registration failed:");
        window.alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    
    <div className="container">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                required
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              required
              onChange={handleChange}
            />
          </div>
          {!isLogin && (
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.number}
                required
                onChange={handleChange}
              />
            </div>
          )}
          <div className="password-input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              required
              onChange={handleChange}
            />
          </div>
          {!isLogin && (
            <div className="password-input">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                required
                onChange={handleChange}
              />
            </div>
          )}

          <button className="button" type="submit" colorScheme="teal">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p id="switch" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Are you a new user? Click to register"
            : "Welcome! Click to continue login"}
        </p>
      </div>
    </div>
  
  );
};

export default Login;