import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Register = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");   
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await register(email, password);

      if (result.success) {
        toast.success(result.message || "Registration successful!");
        // Optionally, redirect to login or another page
        onSwitchToLogin();
      } else {
        toast.error(result.message || "Registration failed!");
        setError(result.message);  
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred.");
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-black flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <img src={assets.logo} alt="Musify Logo" className="w-16 h-16" />
            <h1 className="ml-3 text-3xl font-bold text-white">Musify</h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Join Musify</h2>
          <p className="text-gray-300">Create account to start listening</p>
        </div>

        {/* Register Form */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {
              error && (
                <div className="bg-red-500/20 border-red-500 rounded-lg p3 text-red-300 text-sm mb-4">
                  {error}
                </div>
              )
            }
            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
                className="w-full px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a Password"
                required
                className="w-full px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-300 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your Password"
                required
                className="w-full px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Register Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 flex justify-center px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium cursor-pointer text-white bg-green-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:outline-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ):('Create Account')}
              </button>
            </div>
          </form>
 
          {/* Switch to Login */}
          <p className="text-gray-400 mt-4 text-center">
            Already have an account?{" "}
            <span
              className="text-orange-400 cursor-pointer hover:underline"
              onClick={onSwitchToLogin}
            >
              Sign In
            </span>
          </p>

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            By creating an account, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
