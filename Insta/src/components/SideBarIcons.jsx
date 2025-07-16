import React from 'react';
import { useNavigate } from 'react-router-dom';

function SideBarIcons(props) {
   const id=props.id;
  const navigate = useNavigate();
  return (
     <div className='flex flex-col w-14 bg-slate-200  h-screen fixed  text-base hover:cursor-pointer'>
        <div onClick={()=>navigate(`/home/${id}`)} className='font-playwrite text-3xl font-bold p-3 hover:cursor-pointer'><i className="bi bi-instagram inside-my-icon"></i></div>
        <div className='flex flex-col    font-roboto font-normal flex-1 mx-2 align-middle'>
          <div className=' p-2 hover:cursor-pointer' onClick={()=>navigate(`/home/${id}`)}><i className="fa-solid fa-house  inside-my-icon  "></i></div>
          <div  className=' p-2 hover:cursor-pointer'  onClick={()=>navigate('/search')}><i className="fa-solid fa-magnifying-glass  inside-my-icon "></i></div>
          <div className=' p-2 hover:cursor-pointer' onClick={()=>navigate('/explore')}><i className="fa-regular fa-compass inside-my-icon "></i></div>
          <div  className=' p-2 hover:cursor-pointer' onClick={()=>navigate('/reels')}><i className="fa-regular fa-circle-play inside-my-icon "></i></div>
          <div  className=' p-2 hover:cursor-pointer' onClick={()=>navigate('/message')}><i className="bi bi-chat-quote inside-my-icon "></i></div>
          <div className=' p-2 hover:cursor-pointer'  onClick={()=>navigate('/notifications')}><i className="fa-regular fa-heart inside-my-icon "></i></div>
          <div className=' p-2 hover:cursor-pointer'  onClick={()=>navigate('/create')}><i className="fa-regular fa-square-plus inside-my-icon pr-5"></i></div>
          <div  className=' p-2 hover:cursor-pointer' onClick={()=>navigate(`/profile/${id}`)}><i className="fa-regular fa-circle-user inside-my-icon "></i></div>
        </div>
        <div className='  px-3 hover:cursor-pointer mb-1' onClick={()=>navigate('/more')}><i className="bi bi-list   "></i></div>
        
    </div>
  )
}

export default SideBarIcons;