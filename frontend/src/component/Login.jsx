import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [password, setPassword] = useState("");
 const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const gotoRagister = () => {
    navigate("/registration");
  };

  const LoginAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1604/user/login", {
        email,
        password,
      });
      console.log(response.data);

      // Token store in localstorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      if (response.data) {
        alert("Login successfully ");
        // Optionally, navigate to another page
        navigate("/home");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "User Not Found or Invalid Credentials "
      );
      console.error("Login error:", error.response?.data);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h5 className="text-2xl font-semibold mb-4 text-center">
          Sign into your account
        </h5>

        <form onSubmit={LoginAdmin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-input w-full border rounded-lg p-3"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input w-full border rounded-lg p-3"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Login
          </button>

          <p className="text-sm text-gray-600 mt-4">Forgot password?</p>
          <p className="mt-4 text-blue-600">
            Don't have an account?{" "}
            <span
              onClick={gotoRagister}
              className="underline cursor-pointer hover:text-blue-800"
            >
              Register here
            </span>
          </p>
          <div className="text-sm text-gray-500 mt-2">
            Terms of use. Privacy policy.
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
