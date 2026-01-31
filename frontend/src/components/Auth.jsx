import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const data = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(`${API_URL}${endpoint}`, data);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8 animate-float">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-2 text-glow" style={{fontFamily: 'Orbitron, sans-serif'}}>
              NEXUS
            </h1>
            <p className="text-purple-300 text-lg tracking-widest" style={{fontFamily: 'Rajdhani, sans-serif'}}>
              TASK MANAGEMENT SYSTEM
            </p>
          </div>

          {/* Auth Card */}
          <div className="glass-strong rounded-3xl p-8 shadow-2xl animate-glow">
            <h2 className="text-3xl font-bold text-white mb-6 text-center" style={{fontFamily: 'Orbitron, sans-serif'}}>
              {isLogin ? 'ACCESS PORTAL' : 'CREATE ACCOUNT'}
            </h2>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 backdrop-blur-sm">
                <p className="text-red-200 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-purple-200 text-sm font-semibold tracking-wide uppercase">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-purple-300/50 
                             border border-purple-400/30 focus:border-purple-400 focus:outline-none 
                             focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                    placeholder="Enter username"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-purple-200 text-sm font-semibold tracking-wide uppercase">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass text-white placeholder-purple-300/50 
                           border border-purple-400/30 focus:border-purple-400 focus:outline-none 
                           focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-purple-200 text-sm font-semibold tracking-wide uppercase">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass text-white placeholder-purple-300/50 
                           border border-purple-400/30 focus:border-purple-400 focus:outline-none 
                           focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  placeholder="Enter password"
                  required
                  minLength="6"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-6 py-4 rounded-xl font-bold text-white uppercase tracking-wider
                         bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                         transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>PROCESSING...</span>
                  </div>
                ) : (
                  isLogin ? 'LOGIN' : 'REGISTER'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({ username: '', email: '', password: '' });
                }}
                className="text-purple-300 hover:text-white transition-colors duration-300 font-medium"
              >
                {isLogin ? "Don't have an account? Create one" : 'Already registered? Login'}
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
