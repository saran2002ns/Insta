import React from 'react'
import SideBar from '../SideBar'
import SideBarIcons from '../SideBarIcons'
function Message() {
  return (
     <>
     <div className='flex font-mono'>
        <div className="height-full w-1/4 ">
             <SideBarIcons/>
         </div>
        <div>Message</div>
     </div>
    </>
   
  )
}

export default Message