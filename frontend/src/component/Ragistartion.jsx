import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const CreateAdmin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!isOtpVerified) {
      setMessage("Please verify your OTP before registering.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const formData = { username, email, password };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:27017/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from backend:", response.data);
      alert("Registration Successful. A confirmation email has been sent.");
      navigate("/"); // Redirect to login page after registration

      // Reset form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
      setOtp("");
      setIsOtpSent(false);
      setIsOtpVerified(false);
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        error.response?.data?.msg || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:1604/user/sendotp", {
        email,
      });
      setIsOtpSent(true);
      setMessage("OTP sent to your email.");
      console.log(response);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage(error.response?.data?.msg || "Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:1604/user/verify", {
        email,
        otp: otp.toString(),
      });
      setIsOtpVerified(true);
      setMessage(response.data.msg);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setIsOtpVerified(false);
      setMessage(error.response?.data?.msg || "Error verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  const gotologin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-[700px]">
        <h1 className="text-2xl font-bold mb-6 text-center">
          ADMIN REGISTRATION FORM
        </h1>
        <form onSubmit={CreateAdmin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              UserName
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter User Name"
              required
              className="border rounded-md p-2 w-full mb-3"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2 mb-3">
            <div className="flex-grow">
              <label htmlFor="email" className="block mb-1">
                Email ID
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                required
                className="border rounded-md p-2 w-full"
              />
            </div>
            <Button
              className="mt-6 w-24"
              variant="primary"
              onClick={sendOtp}
              disabled={loading}
            >
              Send OTP
            </Button>
          </div>
          {isOtpSent && (
            <div className="flex flex-col md:flex-row md:space-x-2 mb-3">
              <div className="flex-grow">
                <label htmlFor="otp" className="block mb-1">
                  OTP
                </label>
                <input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <Button
                className="mt-6 w-24"
                variant="primary"
                onClick={verifyOtp}
                disabled={loading}
              >
                Verify OTP
              </Button>
            </div>
          )}
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
              className="border rounded-md p-2 w-full mb-3"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
              required
              className="border rounded-md p-2 w-full mb-3"
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-4"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit form"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:text-blue-800"
              onClick={gotologin}
            >
              Sign in
            </span>
          </p>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <h5 className="text-center text-primary">
            <span className="d-flex justify-content-center">
               {message && <p>{message}</p>}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Registration;
