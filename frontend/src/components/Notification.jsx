import React from 'react'
import { notifications } from '../db/DB'


function Notification() {
  return (
    <div className="h-full w-full bg-white shadow-xl rounded-r-2xl flex flex-col" style={{minWidth: '350px'}}>
      <div className="p-8 pb-0">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <img
                src={notif.avatar}
                alt={notif.user}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <span className="font-semibold text-sm mr-1">{notif.user}</span>
                <span className="text-sm">{notif.message}</span>
                <div className="text-xs text-gray-400 mt-1">{notif.time} ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notification 