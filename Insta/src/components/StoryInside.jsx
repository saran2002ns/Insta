import React from 'react'

function StoryInside() {
  return (
    
  <div class="relative w-full h-screen bg-black">


    <img src="https://via.placeholder.com/800x1400.png?text=Fallback+Image" 
         alt="Fallback" 
         class="absolute w-full h-full object-cover z-0"/>


    <video autoplay muted playsinline loop class="absolute w-full h-full object-cover z-10">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4#t=0,15" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

  
    <div class="absolute inset-0 bg-black bg-opacity-40 z-20"></div>

  
    <div class="absolute top-4 left-4 right-4 z-30 flex justify-between items-center">

      <div class="flex items-center space-x-3">
        <img src="https://i.pravatar.cc/100" alt="Profile" class="w-10 h-10 rounded-full border-2 border-white" />
        <div class="text-white font-semibold text-sm">john_doe</div>
      </div>
     
      <button class="text-white text-2xl font-bold">&times;</button>
    </div>

  </div>
  )
}

export default StoryInside