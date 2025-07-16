import React, { useState, useRef, useEffect } from 'react';



export default function StoryModal({ stories, initialIndex = 0, onClose, onStoryViewed }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Local state for stories to update viewed status instantly
  const [localStories, setLocalStories] = useState(stories);

  useEffect(() => {
    setLocalStories(stories);
  }, [stories]);

  const MAX_DURATION = 15; // seconds

  // Mark current story as viewed in local state and notify parent
  useEffect(() => {
    setLocalStories(prevStories => {
      if (prevStories[currentIndex]?.viewed) return prevStories;
      const updated = [...prevStories];
      updated[currentIndex] = { ...updated[currentIndex], viewed: true };
      return updated;
    });
    if (onStoryViewed) {
      onStoryViewed(currentIndex);
    }
  }, [currentIndex, onStoryViewed]);

  useEffect(() => {
    setProgress(0);
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => {
      const duration = video.duration ? Math.min(video.duration, MAX_DURATION) : MAX_DURATION;
      setProgress((video.currentTime / duration) * 100);
      if (video.currentTime >= MAX_DURATION) {
        if (currentIndex < localStories.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onClose();
        }
      }
    };
    video.addEventListener('timeupdate', updateProgress);
    // Seek to 0 if video is longer than MAX_DURATION
    const handleLoadedMetadata = () => {
      if (video.duration > MAX_DURATION) {
        video.currentTime = 0;
      }
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    // Listen for play/pause events
    const handlePlay = () => setIsPaused(false);
    const handlePause = () => setIsPaused(true);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    setIsPaused(video.paused);
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [currentIndex, localStories.length, onClose]);

  useEffect(() => {
    const video = videoRef.current;
    const handleEnded = () => {
      if (currentIndex < localStories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onClose();
      }
    };
    video?.addEventListener('ended', handleEnded);
    return () => video?.removeEventListener('ended', handleEnded);
  }, [currentIndex, localStories.length, onClose]);

  const handleNext = (e) => {
    e?.stopPropagation();
    if (currentIndex < localStories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentStory = localStories[currentIndex];

  // Carousel: get prev/next stories for side cards
  const getSideStory = (offset) => {
    const idx = currentIndex + offset;
    if (idx < 0 || idx >= localStories.length) return null;
    return localStories[idx];
  };
  const prevStory = getSideStory(-1);
  const nextStory = getSideStory(1);

  // Toggle play/pause on click
  const handleStoryClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
     
    
      {/* Close button top right */}
      <button
        onClick={onClose}
        className="fixed top-6 right-8 z-50 text-white text-4xl hover:text-gray-300 focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>
      {/* Previous nav arrow at far left */}
      {currentIndex > 0 && (
        <button
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 rounded-full p-2 m-4"
          onClick={handlePrev}
          aria-label="Previous story"
        >
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      {/* Next nav arrow at far right */}
      {currentIndex < localStories.length - 1 && (
        <button
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 rounded-full p-2 m-4"
          onClick={handleNext}
          aria-label="Next story"
        >
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
      {/* Carousel container */}
      <div className="flex items-center justify-center w-full h-full">
        {/* Previous story card or empty space */}
        {prevStory ? (
          <div className="hidden md:flex mx-28 flex-col items-center justify-center w-56 h-[70vh] rounded-2xl bg-black/60 shadow-lg scale-90 cursor-pointer transition-all duration-200 relative" onClick={handlePrev}>
            {/* Media */}
            {prevStory.type === 'video' ? (
              <video src={prevStory.src} className="w-full h-full object-cover rounded-2xl mt-2 blur-[1.5px] opacity-60" muted />
            ) : (
              <img src={prevStory.src} alt="prev story" className="w-full h-full object-cover rounded-2xl mt-2 blur-[1.5px] opacity-60" />
            )}
            {/* Overlay avatar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className={`p-1 w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mb-1 ${prevStory.viewed ? 'border-2 border-white bg-slate-200' : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'}`}> 
                <img
                  src={prevStory.avatar}
                  alt={prevStory.name}
                  className="w-full h-full rounded-full border-2 border-white object-cover"
                />
              </div>
            </div>
            {/* Name at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center w-full text-lg font-semibold drop-shadow-lg">
              {prevStory.name}
            </div>
          </div>
        ) : (
          <div className="hidden md:block w-56 mx-28 h-[70vh]" />
        )}
        {/* Main story card always centered */}
        <div className="relative flex flex-col w-[380px] md:w-[420px] h-[100vh] bg-black rounded-2xl shadow-2xl overflow-hidden z-20 mx-auto">
          {/* Progress bars */}
          <div className="absolute top-0 left-0 right-0 px-4 pt-4 z-20">
            <div className="h-1 bg-gray-700 rounded overflow-hidden">
              <div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {/* Top bar: avatar, username, time */}
          <div className="absolute top-10 left-0 right-0 flex items-center justify-between px-6 z-30">
            <div className="flex items-center gap-3">
              <img src={currentStory.avatar} alt={currentStory.name} className="w-9 h-9 rounded-full border-2 border-white" />
              <span className="text-white font-semibold text-base">{currentStory.name}</span>
              <span className="text-gray-300 text-xs ml-2">{currentStory.time || '1h'}</span>
            </div>
          </div>

          {/* Story media */}
          <div className="flex-1 flex items-center justify-center" onClick={currentStory.type === 'video' ? handleStoryClick : undefined} style={{ cursor: currentStory.type === 'video' ? 'pointer' : 'default' }}>
            {currentStory.type === 'video' ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={currentStory.src}
                  playsInline
                  autoPlay
                  loop={false}
                  className="max-h-full max-w-full object-contain bg-black rounded-xl shadow-lg"
                />
                {isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="white" className="opacity-80">
                      <polygon points="8,5 19,12 8,19" />
                    </svg>
                  </div>
                )}
              </div>
            ) : (
              <img
                src={currentStory.src}
                alt="story"
                className="max-h-[60vh] max-w-full object-contain bg-black rounded-xl shadow-lg"
              />
            )}
          </div>
          {/* Reply input at bottom */}
          <form className="flex items-center gap-2 px-4 py-3 bg-black/80 border-t border-gray-800">
            <input type="text" className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 py-1" placeholder={`Reply to ${currentStory.name}...`} />
            <button type="submit" className="text-blue-500 font-semibold">Send</button>
          </form>
        </div>
        {/* Next story card or empty space */}
        {nextStory ? (
          <div className="hidden md:flex flex-col items-center justify-center w-56 h-[70vh] rounded-2xl bg-black/60 shadow-lg scale-90 cursor-pointer transition-all duration-200 mx-28 relative" onClick={handleNext}>
            {/* Media */}
            {nextStory.type === 'video' ? (
              <video src={nextStory.src} className="w-full h-full object-cover rounded-2xl mt-2 blur-[1.5px] opacity-60" muted />
            ) : (
              <img src={nextStory.src} alt="next story" className="w-full h-full object-cover rounded-2xl mt-2 blur-[1.5px] opacity-60" />
            )}
            {/* Overlay avatar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className={`p-1 w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mb-1 ${nextStory.viewed ? 'border-2 border-white bg-slate-200' : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'}`}> 
                <img
                  src={nextStory.avatar}
                  alt={nextStory.name}
                  className="w-full h-full rounded-full border-2 border-white object-cover"
                />
              </div>
            </div>
            {/* Name at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center w-full text-lg font-semibold drop-shadow-lg">
              {nextStory.name}
            </div>
          </div>
        ) : (
          <div className="hidden md:block w-56 mx-28 h-[70vh]" />
        )}
      </div>
    </div>
  );
} 