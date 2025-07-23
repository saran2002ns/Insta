import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { reelTags, reelLocations, reelData } from '../service/DB';
import { FaVolumeMute, FaPlay } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useSwipeable } from 'react-swipeable';
import PostInfo from './PostInfo';
import { getReels} from '../service/Api';

const INITIAL_LOAD = 10;
const LOAD_MORE = 10;

export default function Reels() {
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef(null);
  const snapRefs = useRef([]);
  const navigate = useNavigate();
  const [selectedReel, setSelectedReel] = useState(null);
  const [followRequests, setFollowRequests] = useState({});

  // Infinite scroll: load more reels when at the end
  useEffect(() => {
    if (currentIndex >= reels.length - 2 && reels.length < reelData.length) {
      setTimeout(() => {
        const currentLength = reels.length;
        const nextBatch = reelData.slice(currentLength, currentLength + LOAD_MORE).map(reel => ({
          ...reel,
          tag: reelTags[Math.floor(Math.random() * reelTags.length)],
          location: reelLocations[Math.floor(Math.random() * reelLocations.length)],
        }));
        setReels(prev => [...prev, ...nextBatch]);
      }, 300);
    }
  }, [currentIndex, reels.length]);

  useEffect(() => {
    getReels().then(data =>{
      
     const reeldatas= data.slice(0, INITIAL_LOAD).map(reel => ({
          ...reel,
          tag: reelTags[Math.floor(Math.random() * reelTags.length)],
          location: reelLocations[Math.floor(Math.random() * reelLocations.length)],
        }))
        setReels(reeldatas);
   
    
    }).catch(()=>{
      setReels(
        reelData.slice(0, INITIAL_LOAD).map(reel => ({
            ...reel,
            tag: reelTags[Math.floor(Math.random() * reelTags.length)],
            location: reelLocations[Math.floor(Math.random() * reelLocations.length)],
          }))
        );
    });
  }, []);
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
    delta: 50,
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
    setReels(prevReels =>
      prevReels.map(reel =>
        reel.id === reelId
          ? { ...reel, liked: !reel.liked, likes: !reel.liked ? reel.likes + 1 : reel.likes - 1 }
          : reel
      )
    );
  };
  // Save button handler
  const handleSave = (reelId) => {
    setReels(prevReels =>
      prevReels.map(reel =>
        reel.id === reelId ? { ...reel, saved: !reel.saved } : reel
      )
    );
  };

  // Follow button handler
  const handleFollow = (userId, isPrivate) => {
    setReels(prevReels =>
      prevReels.map(reel =>
        reel.user.userId === userId
          ? isPrivate
            ? reel // For private, do not change followed
            : { ...reel, user: { ...reel.user, followed: !reel.user.followed } }
          : reel
      )
    );
    if (isPrivate) {
      setFollowRequests(prev => ({ ...prev, [userId]: true }));
    }
  };

  const handleUserClick = (userId, user) => {
    if (window.location.pathname === `/user/${userId}`) {
      navigate('/', { replace: true });
      setTimeout(() => {
        navigate(`/user/${userId}`, { replace: true, state: { user } });
        window.dispatchEvent(new Event('forceSidebarReset'));
        if (props.onCloseOverlays) props.onCloseOverlays();
      }, 0);
    } else {
      navigate(`/user/${userId}`, { state: { user } });
      if (props.onCloseOverlays) props.onCloseOverlays();
    }
  };
  console.log('reels',reels);
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
          key={reel.id || index}
          data-index={index}
          ref={el => snapRefs.current[index] = el}
          className="reel-snap w-full h-[calc(100vh-64px)] flex items-center justify-center bg-white"
          style={{ margin: 0, padding: 0 }}
        >
          <div className="flex items-center justify-center h-full">
            {/* Video or Image container */}
            <div
              className="relative overflow-hidden cursor-pointer max-h-full max-w-[300px] w-full h-full flex items-center justify-center"
              onClick={togglePlay}
            >
              {reel.mediaType === 'video' ? (
                <video
                  ref={el => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover max-h-full"
                  muted={muted}
                  loop
                  playsInline
                  onError={e => {
                    console.error('Video failed to load:', reel.mediaUrl, e);
                  }}
                >
                  <source src={reel.mediaUrl} type="video/mp4" />
                  <source src="https://samplelib.com/mp4/sample-5s.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : reel.mediaUrl ? (
                <img
                  src={reel.mediaUrl}
                  alt={reel.caption || 'reel'}
                  className="w-full h-full object-cover max-h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600">
                  No media available
                </div>
              )}
              {/* Mute Icon */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="absolute top-2 right-2 bg-black/60 rounded-full p-2 text-white"
                style={{ margin: 0, padding: 0 }}
                aria-label="Mute"
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
                    src={reel.user.profilePicture}
                    className="w-8 h-8 rounded-full border border-white cursor-pointer hover:opacity-80"
                    onClick={() => handleUserClick(reel.user.userId, reel.user)}
                    alt={reel.user.userId}
                  />
                  <span
                    className="font-semibold cursor-pointer hover:underline"
                    onClick={() => handleUserClick(reel.user.userId, reel.user)}
                  >
                    @{reel.user.userId}
                  </span>
                  <button
                    className={`ml-1 text-xs pointer-events-auto px-3 py-1 rounded font-semibold transition-colors duration-150 ${
                      followRequests[reel.user.userId]
                        ? 'bg-transparent text-gray-500 border border-gray-300'
                        : reel.user.followed
                          ? ' text-gray-500 bg-transparent border border-gray-300'
                          : ' text-blue-400 bg-transparent border border-gray-300'
                    }`}
                    onClick={e => {
                      e.stopPropagation();
                      if (followRequests[reel.user.userId]) {
                        // Cancel follow request
                        setFollowRequests(prev => {
                          const updated = { ...prev };
                          delete updated[reel.user.userId];
                          return updated;
                        });
                      } else if (reel.user.followed) {
                        // Unfollow
                        handleFollow(reel.user.userId, false);
                      } else if (reel.user.private) {
                        // Send follow request
                        setFollowRequests(prev => ({ ...prev, [reel.user.userId]: true }));
                      } else {
                        // Follow public
                        handleFollow(reel.user.userId, false);
                      }
                    }}
                    // Always enabled so user can unfollow or cancel request
                    disabled={false}
                  >
                    {followRequests[reel.user.userId]
                      ? 'Requested'
                      : reel.user.followed
                        ? 'Following'
                        : 'Follow'}
                  </button>
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
                  onClick={() => handleLike(reel.id)}
                >
                  {reel.liked ? (
                    <i className="fa-solid fa-heart text-2xl text-red-500"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-2xl"></i>
                  )}
                </button>
                <span className="text-xs mt-1">{Math.floor(reel.likes)}</span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Comment"
                  onClick={() => setSelectedReel(reel)}
                >
                  <i className="fa-regular fa-comment text-2xl"></i>
                </button>
                <span className="text-xs mt-1">{reel.comments}</span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Share"
                  onClick={() => setSelectedReel(reel)}
                >
                  <i className="fa-regular fa-paper-plane text-2xl"></i>
                </button>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Save"
                  onClick={() => handleSave(reel.id)}
                >
                  {reel.saved ? (
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
