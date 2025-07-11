import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import medicineIllustration from "../assets/medicine_cuate.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.state?.mode === "signup") {
      setState("Sign Up");
    }
  }, [location.state]);

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const route =
        state === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const body =
        state === "Sign Up" ? { name, password, email } : { password, email };

      const { data } = await axios.post(`${backendUrl}${route}`, body);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

useEffect(() => {
  if (token) {
    navigate("/", { replace: true }); 
  }
}, [token]);


  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 bg-[#f0f6ff] flex flex-col items-center justify-center px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-3">
          {state === "Login" ? "New here?" : "Already have an account?"}
        </h2>
        <p className="text-gray-600 max-w-xs mb-6">
          {state === "Login"
            ? "Sign up and explore health services with trusted professionals."
            : "Log in to your account to continue your health journey."}
        </p>
        <button
          disabled={state === "Sign Up" && true}
          onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
          className={`py-2 px-6 rounded-full transition ${
            state === "Login"
              ? "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              : "bg-blue-600 text-white cursor-not-allowed opacity-70"
          }`}
        >
          {state === "Login" ? "SIGN UP" : "LOGIN"}
        </button>
        <img
          src={medicineIllustration}
          alt="Doctor Illustration"
          className="w-60 mt-10"
        />
      </div>

      {/* Right Panel */}
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

        {/* Mode Toggle Text */}
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
