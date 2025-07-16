import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function More() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = async () => {
    setLoading(true);
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 1200));
    localStorage.removeItem('user');
    setLoading(false);
    setShowModal(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    if (!loading) setShowModal(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">More Page</h1>
      <p className="text-gray-600 mt-2">This is the More page content.</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-150"
      >
        Logout
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-80 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="mb-6 text-gray-600 text-center">Are you sure you want to log out?</p>
            <div className="flex gap-4 w-full">
              <button
                onClick={confirmLogout}
                className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-150 flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Logging out...
                  </span>
                ) : (
                  'Yes, Logout'
                )}
              </button>
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition-all duration-150"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default More; 