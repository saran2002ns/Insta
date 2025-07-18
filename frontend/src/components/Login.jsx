import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsers } from '../db/DB';

const Login = () => {
  const [userIdName, setUserIdName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 1200));
    if (!userIdName || !password) {
      setError('Please enter both fields');
      setLoading(false);
      return;
    }
    // Check credentials from DB
    const foundUser = loginUsers.find(
      (user) => user.userIdName === userIdName && user.password === password
    );
    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      setLoading(false);
      navigate('/');
    } else {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  // Quick login handler
  const quickLogin = (userId, pass) => {
    setUserIdName(userId);
    setPassword(pass);
    // Do not auto-submit; user must click Log In
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200">
      <div className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-2xl w-96">
        <div className="mb-8 flex flex-col items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" className="w-20 h-20 mb-2" />
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">Instagram</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="User ID Name"
            value={userIdName}
            onChange={e => setUserIdName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="username"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="current-password"
            required
            disabled={loading}
          />
          {error && <div className="text-red-500 text-center text-sm font-medium">{error}</div>}
          <button
           
            className={`w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:from-pink-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        <div className="flex flex-row gap-4 mt-4 w-full">
          <button
            onClick={() => quickLogin('chitti_robo', 'chitti123')}
            className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 rounded-lg shadow text-sm transition-all duration-150"
            disabled={loading}
          >
            Quick Login: Chitti
          </button>
          <button
            onClick={() => quickLogin('ra_one', 'raone123')}
            className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 rounded-lg shadow text-sm transition-all duration-150"
            disabled={loading}
          >
            Quick Login: Ra One
          </button>
        </div>
        {/* Sample users for quick login */}
        <div className="mt-6 text-gray-500 text-sm text-center">
          <span>Test users:</span>
          <ul className="mt-2 space-y-1">
            <li className="text-xs text-gray-700">
              <span className="font-semibold">chitti_robo</span> / <span>chitti123</span>
            </li>
            <li className="text-xs text-gray-700">
              <span className="font-semibold">ra_one</span> / <span>raone123</span>
            </li>
          </ul>
        </div>
        <div className="mt-8 text-gray-400 text-xs">&copy; {new Date().getFullYear()} Instagram Demo</div>
      </div>
    </div>
  );
};

export default Login; 