import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { sampleUsers, reelCaptions, reelTags, reelLocations, reelVideos } from '../db/DB';
import {
  FaVolumeMute,
  FaPlay,
} from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useSwipeable } from 'react-swipeable';
import PostInfo from './PostInfo';

// Helper to generate fake reels
const generateReels = (startIdx, count) => {
  const users = sampleUsers.map(u => ({ name: u.username, avatar: u.avatar }));
  return Array.from({ length: count }, (_, i) => {
    const idx = (startIdx + i) % users.length;
    return {
      id: startIdx + i + 1,
      url: reelVideos[(startIdx + i) % reelVideos.length],
      captionTop: reelCaptions[(startIdx + i) % reelCaptions.length],
      avatar: users[idx].avatar,
      user: users[idx].name,
      tag: reelTags[(startIdx + i) % reelTags.length],
      location: reelLocations[(startIdx + i) % reelLocations.length],
      likes: Math.floor(Math.random() * 300000) + 1000,
      comments: Math.floor(Math.random() * 300) + 10,
    };
  });
};

const INITIAL_LOAD = 10;
const LOAD_MORE = 10;

export default function Reels() {
  const [reels, setReels] = useState(() => generateReels(0, INITIAL_LOAD));
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef(null);
  const snapRefs = useRef([]);
  const touchStartY = useRef(null);
  const scrollTimeout = useRef(null);
  const navigate = useNavigate();
  const [likedReels, setLikedReels] = useState({});
  const [savedReels, setSavedReels] = useState({});
  const [reelsState, setReelsState] = useState(reels);
  const [selectedReel, setSelectedReel] = useState(null);

  // Infinite scroll: load more reels when at the end
  useEffect(() => {
    if (currentIndex >= reels.length - 2) {
      setTimeout(() => {
        setReels((prev) => [
          ...prev,
          ...generateReels(prev.length, LOAD_MORE),
        ]);
      }, 300);
    }
  }, [currentIndex, reels.length]);

  // Intersection Observer for snap detection
  useEffect(() => {
    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.6,
    };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-index'));
          setCurrentIndex(idx);
        }
      });
    };
    const observer = new window.IntersectionObserver(callback, options);
    const nodes = document.querySelectorAll('.reel-snap');
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [reels.length]);

  // Auto-play the current video
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === currentIndex) {
        video.currentTime = 0;
        video.play();
      } else {
        video.pause();
      }
    });
    setIsPlaying(true);
  }, [currentIndex, reels.length]);

  const togglePlay = () => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
    const video = videoRefs.current[currentIndex];
    if (video) {
      video.muted = !video.muted;
    }
  };

  // Handle wheel scroll to move one video at a time
  const handleWheel = (e) => {
    if (scrollTimeout.current) {
      e.preventDefault();
      return;
    }
    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 1000);
    e.preventDefault();
    if (e.deltaY > 0 && currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndex < reels.length - 1) setCurrentIndex(prev => prev + 1);
    },
    onSwipedDown: () => {
      if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    },
    delta: 50, // minimum distance(px) before a swipe is detected
    trackTouch: true,
    trackMouse: false,
    preventDefaultTouchmoveEvent: true,
  });

  // Scroll to the current video when currentIndex changes
  useEffect(() => {
    if (snapRefs.current[currentIndex]) {
      snapRefs.current[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentIndex]);

  // Like button handler
  const handleLike = (reelId) => {
    setLikedReels((prev) => ({
      ...prev,
      [reelId]: !prev[reelId],
    }));
    setReelsState((prevReels) =>
      prevReels.map((reel) =>
        reel.id === reelId
          ? { ...reel, liked: !reel.liked, likes: !reel.liked ? reel.likes + 1 : reel.likes - 1 }
          : reel
      )
    );
  };
  // Save button handler
  const handleSave = (reelId) => {
    setSavedReels((prev) => ({
      ...prev,
      [reelId]: !prev[reelId],
    }));
    setReelsState((prevReels) =>
      prevReels.map((reel) =>
        reel.id === reelId ? { ...reel, saved: !reel.saved } : reel
      )
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-white w-full mx-auto h-[calc(100vh-64px)] overflow-hidden"
      style={{ scrollBehavior: 'smooth' }}
      onWheel={handleWheel}
      {...handlers}
    >
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          data-index={index}
          ref={el => snapRefs.current[index] = el}
          className="reel-snap w-full h-[calc(100vh-64px)] flex items-center justify-center bg-white"
          style={{ margin: 0, padding: 0 }}
        >
          <div className="flex items-center justify-center h-full">
            {/* Video container */}
            <div
              className=" relative   overflow-hidden cursor-pointer max-h-full max-w-[300px] w-full h-full flex items-center justify-center"
              onClick={togglePlay}
            >
              {/* Video */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={reel.url}
                className="w-full h-full object-cover max-h-full"
                muted={muted}
                loop
                playsInline
              />
              {/* Caption on top */}
              {/* <div className="absolute top-3 w-full px-4 text-center pointer-events-none">
                <p className="text-white text-sm font-light">
                  {reel.captionTop.split(" ").map((word, idx) => {
                    if (word === "Meghalaya")
                      return (
                        <span key={idx} className="text-yellow-400 font-semibold">
                          {word + " "}
                        </span>
                      );
                    if (word === "September")
                      return (
                        <span key={idx} className="text-blue-300 font-semibold">
                          {word + " "}
                        </span>
                      );
                    return word + " ";
                  })}
                </p>
              </div> */}
              {/* Mute Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="absolute top-2 right-2 bg-black/60 rounded-full p-2 text-white"
                style={{ margin: 0, padding: 0 }}
              >
                <FaVolumeMute size={16} />
              </button>
              {/* Center play icon */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
                  <FaPlay className="text-white text-4xl" />
                </div>
              )}
              {/* Bottom details */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white text-sm pointer-events-none">
                <div className="flex items-center gap-2 mb-2 pointer-events-auto">
                  <img
                    src={reel.avatar}
                    className="w-8 h-8 rounded-full border border-white cursor-pointer hover:opacity-80"
                    onClick={() => navigate(`/user/${reel.user}`)}
                    alt={reel.user}
                  />
                  <span
                    className="font-semibold cursor-pointer hover:underline"
                    onClick={() => navigate(`/user/${reel.user}`)}
                  >
                    @{reel.user}
                  </span>
                  <button className="text-blue-400 ml-1 text-xs pointer-events-auto">Follow</button>
                </div>
                <div className="text-xs mb-2">
                  📍 All the places to visit in {reel.location.split(",")[0]}...
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-white/20 rounded-full px-2 py-1 text-xs flex items-center gap-1">
                    ↗ {reel.tag}
                  </span>
                  <span className="bg-white/20 rounded-full px-2 py-1 text-xs flex items-center gap-1">
                    <MdLocationPin /> {reel.location}
                  </span>
                </div>
              </div>
            </div>
            {/* Action icons column outside video, close to video */}
            <div className="flex flex-col items-center gap-6 ml-6 text-gray-700 h-full justify-center">
              <div className="flex flex-col items-center">
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Like"
                  onClick={() => handleLike(reelsState[currentIndex].id)}
                >
                  {reelsState[currentIndex].liked ? (
                    <i className="fa-solid fa-heart text-2xl text-red-500"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-2xl"></i>
                  )}
                </button>
                <span className="text-xs mt-1">{Math.floor(reelsState[currentIndex]?.likes / 1000)}K</span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Comment"
                  onClick={() => setSelectedReel(reelsState[currentIndex])}
                >
                  <i className="fa-regular fa-comment text-2xl"></i>
                </button>
                <span className="text-xs mt-1">{reelsState[currentIndex]?.comments}</span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Share"
                  onClick={() => setSelectedReel(reelsState[currentIndex])}
                >
                  <i className="fa-regular fa-paper-plane text-2xl"></i>
                </button>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Save"
                  onClick={() => handleSave(reelsState[currentIndex].id)}
                >
                  {reelsState[currentIndex].saved ? (
                    <i className="fa-solid fa-bookmark text-2xl text-black"></i>
                  ) : (
                    <i className="fa-regular fa-bookmark text-2xl"></i>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
      {selectedReel && (
        <PostInfo post={selectedReel} onClose={() => setSelectedReel(null)} />
      )}
    </div>
  );
}
