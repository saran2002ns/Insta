import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
     const navigate = useNavigate();
    // useEffect(() => {
    //      navigate('/Home/1')
    // }, []);
    const guestMode =()=>{
      navigate('/home/1');
    }
  return (
         <div className="min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1350&q=80')" }}>
            <div className="glass rounded-xl shadow-xl p-6 w-full max-w-sm text-white backdrop-blur-lg border border-white/20 bg-white/10">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
             
                <div className="mb-3">
                  <label htmlFor="username" className="block text-sm mb-1 font-medium">Username</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Your username"
                    className="w-full px-3 py-1.5 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  />
                </div>
            
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm mb-1 font-medium">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Your password"
                    className="w-full px-3 py-1.5 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  />
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-1.5 rounded-md font-semibold text-white text-sm mb-3">
                  Login
                </button>
            
                <p className="text-center text-xs mb-4">
                  New here?{" "}
                  <a href="#" className="text-blue-300 hover:underline font-medium">Register</a>
                </p>
          
                <div className="flex items-center mb-3">
                  <div className="flex-grow h-px bg-white/30"></div>
                  <span className="px-2 text-xs text-white/70">or</span>
                  <div className="flex-grow h-px bg-white/30"></div>
                </div>
              
                <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-1.5 rounded-md text-white font-medium text-sm mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.35 11.1H12v2.8h5.4c-.6 2.1-2.4 3.5-5.4 3.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.6 0 3 .6 4.1 1.6l2.1-2.1C16.9 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.5-3.9 9.5-9.5 0-.6-.1-1.3-.2-1.9z" />
                  </svg>
                  Google Login
                </button>
              
                <button 
                  onClick={guestMode}
                  className="w-full bg-gray-300/50 hover:bg-gray-400/70 text-white py-1.5 rounded-md text-sm font-medium backdrop-blur">
                  Guest Mode
                </button>
            </div>
         </div>
  )
}

export default Login;