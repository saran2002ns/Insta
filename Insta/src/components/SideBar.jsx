import React from 'react'
import { useNavigate } from 'react-router-dom';

function SideBar(props) {
  const id=props.id;
  const navigate = useNavigate();
  return (
    <div className='flex flex-col   h-screen fixed w-1/5 text-base hover:cursor-pointer'>
        <div onClick={()=>navigate(`/home/${id}`)} className='font-playwrite text-3xl font-bold p-3 hover:cursor-pointer'>Instagram</div>
        <div className='flex flex-col    font-roboto font-normal flex-1 mx-2'>
          <div className='my-icon ' onClick={()=>navigate(`/home/${id}`)}><i className="fa-solid fa-house inside-my-icon "></i>Home</div>
          <div className='my-icon ' onClick={()=>navigate('/search')}><i className="fa-solid fa-magnifying-glass inside-my-icon "></i>Search</div>
          <div className='my-icon' onClick={()=>navigate('/explore')}><i className="fa-regular fa-compass inside-my-icon "></i>Explore</div>
          <div className='my-icon' onClick={()=>navigate('/reels')}><i className="fa-regular fa-circle-play inside-my-icon "></i>Reels</div>
          <div className='my-icon' onClick={()=>navigate('/message')}><i className="bi bi-chat-quote inside-my-icon "></i>Message</div>
          <div className='my-icon' onClick={()=>navigate('/notifications')}><i className="fa-regular fa-heart inside-my-icon "></i>Notifications</div>
          <div className='my-icon' onClick={()=>navigate('/create')}><i className="fa-regular fa-square-plus inside-my-icon pr-5"></i>Create</div>
          <div className='my-icon' onClick={()=>navigate(`/profile/${id}`)}><i className="fa-regular fa-circle-user inside-my-icon "></i>Profile</div>
        </div>
        <div className='font-roboto font-base pl-6 pr-3 mb-1' onClick={()=>navigate('/more')}><i className="bi bi-list  inside-my-icon "></i>More</div>
        
    </div>
  )
  
}

export default SideBar