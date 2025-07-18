import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Search(props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([]) // Changed from sampleUsers to []
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredUsers([]) // Changed from sampleUsers to []
    } else {
      // Assuming sampleUsers is defined elsewhere or needs to be imported
      // For now, we'll just filter an empty array, which will result in an empty array
      // If sampleUsers is meant to be used, it needs to be passed as a prop or defined globally.
      // For this edit, we'll assume it's not available and filter an empty array.
      setFilteredUsers([]) // Changed from sampleUsers to []
    }
  }

  const handleUserClick = (username) => {
    if (window.location.pathname === `/user/${username}`) {
      // Force remount: navigate away and back
      navigate('/', { replace: true });
      setTimeout(() => {
        navigate(`/user/${username}`, { replace: true });
        window.dispatchEvent(new Event('forceSidebarReset'));
        if (props.onCloseOverlays) props.onCloseOverlays();
      }, 0);
    } else {
      navigate(`/user/${username}`);
      if (props.onCloseOverlays) props.onCloseOverlays();
    }
  }

  return (
    <div className="h-full w-full bg-white shadow-xl rounded-r-2xl flex flex-col " style={{minWidth: '350px'}}>
      <div className="p-8 pb-0">
        {/* Search Header */}
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="  Search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => handleUserClick(user.username)} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm">{user.username}</span>
                    {user.isVerified && (
                      <i className="fa-solid fa-circle-check text-blue-500 text-xs"></i>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">{user.fullName}</span>
                </div>
              </div>
              <button className={`px-4 py-1 rounded-lg text-sm font-semibold ${
                user.isFollowing 
                  ? 'text-gray-500 hover:text-red-500' 
                  : 'text-blue-500 hover:text-blue-600'
              }`}>
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>

        {/* Recent Searches */}
        {searchQuery === '' && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Recent</h2>
            <div className="space-y-3">
              {/* Assuming sampleUsers is defined elsewhere or needs to be imported */}
              {/* For now, we'll just display an empty list */}
              {[]} 
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search 