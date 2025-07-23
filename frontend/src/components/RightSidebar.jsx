import React, { useState, useEffect } from 'react';
import { getSuggections } from '../service/Api';
import { user } from '../service/Api';
import { useNavigate } from 'react-router-dom';

export default function RightSidebar() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [followRequests, setFollowRequests] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getSuggections().then(data => {
      setSuggestedUsers(data);
      setLoading(false);
    }).catch(() => {
      setSuggestedUsers([]);
      setLoading(false);
    });
  }, []);

  const handleUserClick = (userId, userObj) => {
    if (window.location.pathname === `/user/${userId}`) {
      navigate('/', { replace: true });
      setTimeout(() => {
        navigate(`/user/${userId}`, { replace: true, state: { user: userObj } });
        window.dispatchEvent(new Event('forceSidebarReset'));
      }, 0);
    } else {
      navigate(`/user/${userId}`, { state: { user: userObj } });
    }
  };

  const handleFollow = (userId, isPrivate) => {
    setSuggestedUsers(prevUsers =>
      prevUsers.map(u =>
        u.userId === userId
          ? isPrivate
            ? u
            : { ...u, followed: !u.followed }
          : u
      )
    );
    if (isPrivate) {
      setFollowRequests(prev => ({ ...prev, [userId]: true }));
    } else {
      setFollowRequests(prev => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-full ml-8 mt-12 pt-2">
      {/* Current User */}
      <div className="flex items-center mb-6">
        <img src={user.profilePicture} alt={user.userId} className="w-9 h-9 rounded-full mr-3 object-cover" />
        <div>
          <div className="font-semibold text-gray-800 text-sm">{user.userId}</div>
          <div className="text-xs text-gray-500">{user.username}</div>
        </div>
      </div>
      {/* Suggestions */}
      <div className="p-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Suggested for you</h3>
          <button className="text-xs text-gray-700 font-semibold hover:underline">See All</button>
        </div>
        <div className="flex flex-col gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={`loading-suggestion-${idx}`} className="flex items-center justify-between animate-pulse">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="w-16 h-7 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            suggestedUsers.slice(1, 6).map((user) => (
              <div key={user.userId} className="flex items-center justify-between">
                <div
                  className="flex items-center"
                  onClick={() => handleUserClick(user.userId, user)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={user.profilePicture} alt={user.userId} className="w-9 h-9 rounded-full mr-3 object-cover" />
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{user.userId}</div>
                    <div className="text-xs text-gray-500">{user.username}</div>
                  </div>
                </div>
                <button
                  className={`text-xs font-semibold px-3 py-1 rounded transition-colors duration-150 border ${
                    followRequests[user.userId]
                      ? 'bg-transparent text-gray-500 border-gray-300'
                      : user.followed
                        ? 'bg-transparent text-gray-500 border-gray-300'
                        : 'bg-transparent text-blue-400 border-gray-300'
                  }`}
                  onClick={() => {
                    if (followRequests[user.userId]) {
                      // Cancel request
                      setFollowRequests(prev => {
                        const updated = { ...prev };
                        delete updated[user.userId];
                        return updated;
                      });
                    } else if (user.followed) {
                      handleFollow(user.userId, false);
                    } else if (user.private) {
                      setFollowRequests(prev => ({ ...prev, [user.userId]: true }));
                    } else {
                      handleFollow(user.userId, false);
                    }
                  }}
                >
                  {followRequests[user.userId]
                    ? 'Requested'
                    : user.followed
                      ? 'Following'
                      : 'Follow'}
                </button>
              </div>
            ))
          )}
        </div>  
      </div>
    </aside>
  );
} 