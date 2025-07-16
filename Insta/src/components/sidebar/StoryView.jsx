import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function StoryView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stories, setStories] = useState(location.state?.stories || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  console.log(stories)

  useEffect(() => {
    if (stories[currentIndex] && !stories[currentIndex].viewed) {
      stories[currentIndex].viewed=true;
      setStories(stories);
    }

    // const video = videoRef.current;
    // if (video) {
    //   video.currentTime = 0;
    //   video.play();
    // }
  }, [currentIndex]);

  useEffect(() => {
    const video = videoRef.current;
    const handleEnded = () => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    };
    video?.addEventListener("ended", handleEnded);
    return () => video?.removeEventListener("ended", handleEnded);
  }, [currentIndex, stories]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const StoryThumbnail = ({ story,index}) => (
    <div
      className={`flex-shrink-0 rounded-full p-[2px]  ${
        story.viewed
          ? "bg-gray-400"
          : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
      }`}
      onClick={()=>{setCurrentIndex(index)}}
    >
      <video
        className="  w-14 h-14 rounded-full object-cover "
        src={story.video}
        muted
        loop
        preload="metadata"
      />
    </div>
  );

  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center relative">
     
      <div className=" left-4 top-1/2 -translate-y-1/2 flex gap-3 flex-1 overflow-hidden justify-end">
        {stories.slice(0, currentIndex).map((story,index) => (
          <StoryThumbnail key={story.id} story={story} index={index} />
        ))}
      </div>

      
      <div className="h-3/4 flex flex-col items-center justify-center relative m-3">
        <video
          ref={videoRef}
          src={stories[currentIndex]?.video}
          playsInline
          autoPlay
          loop
          className="w-full h-full object-cover rounded-lg "
        />
        <h2 className="absolute bottom-[-50px] text-xl  font-roboto text-white">
          {stories[currentIndex]?.name}
        </h2>
      </div>


      <div className=" right-4 top-1/2 -translate-y-1/2 flex flex-1 gap-3 justify-start overflow-hidden">
        {stories.slice(currentIndex + 1).map((story,index) => (
          <StoryThumbnail key={story.id} story={story} index={index+currentIndex + 1} />
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl text-white px-4"
        >
          ◀
        </button>
      )}
      {currentIndex < stories.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl text-white px-4"
        >
          ▶
        </button>
      )}
      <button
          onClick={() => navigate(-1)}
          className="absolute right-3 top-3 text-4xl text-white px-4"
        >
          X
        </button>
    </div>
  );
}
