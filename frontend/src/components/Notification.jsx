import React, { useEffect, useState } from 'react'
import {  notifications as notify} from '../service/DB';
import {  getNotifications } from '../service/Api';
import {  useNavigate } from 'react-router-dom';


function Notification() {
  const navigate = useNavigate();
  const [notifications,setNotifications] = useState([]);
    useEffect(()=>{
      getNotifications().then(data =>{
        setNotifications(data);
      }).catch(()=>{
        setNotifications(notify);
      });
    }
      ,[]);
  const handleUserClick = (userId, user) => {
    if (window.location.pathname === `/user/${userId}`) {
      navigate('/', { replace: true });
      setTimeout(() => {
        navigate(`/user/${userId}`, { replace: true, state: { user } });
        window.dispatchEvent(new Event('forceSidebarReset'));
        if (props.onCloseOverlays) props.onCloseOverlays();
      }, 0);
    } else {
      navigate(`/user/${userId}`, { state: { user } });
      if (props.onCloseOverlays) props.onCloseOverlays();
    }
  };
  console.log(notifications);

  return (
    <div className="fixed bg-white shadow-xl rounded-r-2xl flex flex-col" style={{minWidth: '350px',height: '100vh', maxHeight: '100vh'}}>
      <div className="p-8 pb-0">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => handleUserClick(notif.user.userId, notif.user)}>
              <div className="flex items-center"  style={{ cursor: 'pointer' }}>
                <img
                  src={notif.user.profilePicture}
                  alt={notif.user.username}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
               
              </div>
              <div className="flex-1 items-center">
               <span className="font-semibold text-sm mr-1">{notif.user.username}</span>
                <span className="text-sm">{notif.type}</span>
                <div className="text-xs text-gray-400 mt-1">{notif.createdAt} ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notification 