import React from 'react'
import SideBar from '../SideBar'
import SideBarIcons from '../SideBarIcons'
function Notifications() {
  return (
     <>
     <div className='flex font-mono'>
       <div className="height-full w-1/4 ">
            <SideBarIcons/>
         </div>
       <div>Notifications</div>
     </div>
    </>
   
  )
}

export default Notifications