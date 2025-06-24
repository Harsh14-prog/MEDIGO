import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import medicineIllustration from "../assets/medicine_cuate.svg";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      {/* Left Panel with Illustration */}
      <div className="w-full md:w-1/2 bg-[#f0f6ff] flex flex-col items-center justify-center px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-3">New here?</h2>
        <p className="text-gray-600 max-w-xs mb-6">
          Sign up and explore health services with trusted professionals.
        </p>
        <button
          onClick={() => setState("Sign Up")}
          className="border border-blue-600 text-blue-600 py-2 px-6 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          SIGN UP
        </button>
        <img
          src={medicineIllustration}
          alt="Doctor Illustration"
          className="w-60 mt-10"
        />
      </div>

      {/* Right Panel with Form */}
      <div className="w-full md:w-1/2 px-10 py-16 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {state === "Sign Up" ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-full hover:from-blue-600 hover:to-indigo-600 transition"
          >
            {state === "Sign Up" ? "Create Account" : "SIGN IN"}
          </button>
        </form>

        {/* Switch Auth Type */}
        <p className="mt-6 text-sm text-center text-gray-600">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Sign up here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
