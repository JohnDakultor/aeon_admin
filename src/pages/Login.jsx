import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/Authentication";

const LoginForm = () => {
  const [pin, setPin] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Automatically focus the next input box
      if (value && index < 5) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      document.getElementById(`pin-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pinString = pin.join("");

    if (pinString.length !== 6) {
      setError("PIN must be exactly 6 digits.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        pin: pinString,
      });

      if (response.data.success) {
        setSuccess("Login successful!");
        setError("");
        login({ pin: pinString });
        navigate("/admin");
      } else {
        setError(response.data.message || "Invalid PIN. Please try again.");
        setSuccess("");
      }
    } catch (err) {
      setError("An error occurred while processing your request.");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg px-8 py-12 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
          Welcome to Aeon Tower by CMC
        </h1>
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center mb-10">PIN Login</h2>
          <div className="mb-10">
            <label
              htmlFor="pin"
              className="block text-gray-700 text-lg font-bold mb-6 text-center"
            >
              Enter Your 6-Digit PIN
            </label>
            <div className="flex flex-wrap justify-center gap-6 md:gap-4">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type="password"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-20 h-20 text-3xl text-center bg-gray-50 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform duration-300 hover:scale-110 sm:w-16 md:w-20"
                  required
                />
              ))}
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-6 text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm mb-6 text-center">{success}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-8 rounded-lg w-full text-xl font-semibold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
