import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  //Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated()) {
      navigate('/add-song', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);


  // if (isAuthenticated()) {
  //   return null;
  // }


  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all details");
      return;
    }

    setLoading(true);

    // try{
    const result = await login(email, password);
    if (result.success) {
      toast.success("Admin logged in successfully!");
      navigate("/add-song");
    }
    else {
      toast.error(result.message);
    }
    // }catch(err){
    //     toast.error(err.message);
    // }finally{
    setLoading(false);
    // }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>

      <div className='max-w-md w-full space-y-8'>
        <div className='flex items-center justify-center mb-6'>
          <img src={assets.logo} alt="logo" className='h-12 w-12' />
          <h1 className='ml-3 text-3xl font-bold text-white'>Musify</h1>
        </div>

        <h2 className='text-2xl font-bold text-white text-center'>Admin Panel</h2>
        <p className='text-gray-300 text-center'>
          Sign in to manage your music library
        </p>

        <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow border border-white/20'>
          <form className='space-y-6' onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className='block text-sm font-medium text-gray-200 mb-2'>
                Email address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-300' size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className='block text-sm font-medium text-gray-200 mb-2'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-300' size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full flex justify-center py-3 px-4
                rounded-lg shadow-sm text-sm font-medium text-white
                bg-gradient-to-r from-green-600 to-blue-600
                hover:from-green-700 hover:to-blue-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 transform hover:scale-105
              "
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
