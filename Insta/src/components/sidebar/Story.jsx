

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";



const stories = [
  { id: 1, name: "saran", video: "https://www.w3schools.com/html/mov_bbb.mp4", viewed: false },
  { id: 2, name: "saran", video: "https://www.w3schools.com/html/movie.mp4", viewed: false },
  { id: 3, name: "saran", video: "https://www.w3schools.com/html/mov_bbb.mp4", viewed: false },
  { id: 4, name: "saran", video: "https://www.w3schools.com/html/movie.mp4", viewed: false },
  { id: 5, name: "saran", video: "https://www.w3schools.com/html/mov_bbb.mp4", viewed: false },
  { id: 6, name: "saran", video: "https://www.w3schools.com/html/movie.mp4", viewed: false },
  { id: 7, name: "saran", video: "https://www.w3schools.com/html/movie.mp4", viewed: false },
  { id: 8, name: "saran", video: "https://www.w3schools.com/html/mov_bbb.mp4", viewed: false },
  { id: 9, name: "saran", video: "https://www.w3schools.com/html/movie.mp4", viewed: false }
];


export default function StoryViewer() {
  const navigate=useNavigate();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative bg-white w-full h-28 mt-2 overflow-hidden ">
     
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
        onClick={scrollLeft}
      >
        <i className="fa-solid fa-circle-chevron-left text-xl text-black"></i>
      </button>

     
      <div
        ref={scrollRef}
        className="flex items-center h-full overflow-x-auto scroll-smooth no-scrollbar px-12 space-x-2"
      >
          {stories.map((story, index) => (
            <div
              key={`${story.id}-${index}`} 
              className="flex flex-col justify-center items-center"
            > 
              <div
                className="p-[3px] w-auto h-auto rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600
                          overflow-hidden bg-black flex items-center justify-center"
                onClick={()=>navigate('/storyview', { state: { stories } })}
              >
                <video
                  src={story.video}
                  className="flex-shrink-0 object-cover w-16 h-16 border-2 rounded-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <p>{story.name}</p>
            </div>
          ))}

      </div>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
        onClick={scrollRight}
      >
        <i className="fa-solid fa-circle-chevron-right text-xl text-black"></i>
      </button>
      <p></p>
    </div>
  );
}

