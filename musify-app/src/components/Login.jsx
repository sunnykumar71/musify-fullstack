import { useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = ({onSwitchToRegister}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {login}=useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        if (!email || !password) {
          setError("All fields are required");
          toast.error("All fields are required");
          return;
        }
    
        setLoading(true);
        try {
      
          const  result =  await login(email, password);
          if(!result.success){
            toast.error(result.message);
            setError(result.message );
            
          }
        }catch(e){
          setError(e.message);
          toast.error("An unexpected error occurred. Please try again later.");
          
        }finally {
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

          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300">Login to continue listening</p>
        </div>

        {/* Login Form */}
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
                name="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 flex justify-center px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium cursor-pointer text-white bg-green-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:outline-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {
                  loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )     
                }
                
              </button>
            </div>
          </form>

          {/* Switch to Register */}
          <p className="text-gray-400 mt-4 text-center">
            Don’t have an account?{" "}
            <span 
            onClick={onSwitchToRegister}
            className="text-green-500 cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
