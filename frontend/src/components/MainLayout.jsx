import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Search from './Search';
import Notification from './Notification';
import { MAIN_ROUTES } from '../db/DB';

const MainLayout = () => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isNotificationMode, setIsNotificationMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchMode((prev) => {
      if (!prev) setIsNotificationMode(false);
      return !prev;
    });
  };

  const handleNotificationClick = () => {
    setIsNotificationMode((prev) => {
      if (!prev) setIsSearchMode(false);
      return !prev;
    });
  };

  // Close overlays when navigating to any main route
  useEffect(() => {
    if (MAIN_ROUTES.includes(location.pathname)) {
      setIsSearchMode(false);
      setIsNotificationMode(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleCloseOverlays = () => {
    setIsSearchMode(false);
    setIsNotificationMode(false);
  };

  return (
    <div className="flex relative min-h-screen">
      <SideBar
        onSearchClick={handleSearchClick}
        isSearchMode={isSearchMode}
        onNotificationClick={handleNotificationClick}
        isNotificationMode={isNotificationMode}
        onCloseOverlays={handleCloseOverlays}
      />
      <div className="flex-1 ml-[20%] p-4">
        <Outlet />
      </div>
      {isSearchMode && (
        <div className="absolute left-16 top-0 h-full z-20" style={{ width: '400px' }}>
          <Search />
        </div>
      )}
      {isNotificationMode && (
        <div className="absolute left-16 top-0 h-full z-20" style={{ width: '400px' }}>
          <Notification />
        </div>
      )}
    </div>
  );
};

export default MainLayout; 