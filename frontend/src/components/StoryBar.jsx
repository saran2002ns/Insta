import React, { useRef, useState, useEffect } from 'react';
import { getStories } from '../service/Api';
import { stories as storiesDB } from '../service/DB';
import StoryModal from './StoryModal';

export default function StoryBar() {
  const scrollRef = useRef(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [storyModalIndex, setStoryModalIndex] = useState(0);
  const [sortedStoriesForModal, setSortedStoriesForModal] = useState([]);

  useEffect(() => {
    setLoading(true);
    getStories().then(data => {
      setStories(data);
      setLoading(false);
    }).catch(() => {
      setStories(storiesDB);
      setLoading(false);
    });
  }, []);

  // Helper to get sorted stories as displayed
  const getSortedStories = () => {
    return stories
      .map((story, idx) => ({
        ...story,
        _originalIndex: idx,
        mediaType: story.storyType || 'video',
      }))
      .sort((a, b) => (a.viewed === b.viewed ? a._originalIndex - b._originalIndex : a.viewed - b.viewed));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
      setIsOverflowing(el.scrollWidth > el.clientWidth + 1);
    };
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    const timeoutId = setTimeout(update, 100);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      clearTimeout(timeoutId);
    };
  }, [stories, loading]);

  // Mark story as viewed
  const handleStoryViewed = (originalIndex) => {
    setStories((prev) => {
      if (prev[originalIndex]?.viewed) return prev;
      const updated = [...prev];
      updated[originalIndex] = { ...updated[originalIndex], viewed: true };
      return updated;
    });
    setSortedStoriesForModal((prev) => {
      if (!prev.length) return prev;
      return prev.map(story =>
        story._originalIndex === originalIndex ? { ...story, viewed: true } : story
      );
    });
  };

  return (
    <>
      <div className="relative bg-white w-full h-28 overflow-hidden flex items-center">
        {isOverflowing && canScrollLeft && (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full  p-1"
            onClick={() => scrollRef.current.scrollBy({ left: -261, behavior: 'smooth' })}
            type="button"
          >
            <i className="fa-solid fa-circle-chevron-left text-2xl text-white"></i>
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex items-center h-full overflow-x-auto scroll-smooth no-scrollbar pl-4 space-x-9 w-full"
        >
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={`loading-${index}`} className="flex flex-col justify-center items-center min-w-[50px]">
                <div className="p-[3px] w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mb-1 bg-gray-200 animate-pulse">
                  <div className="w-full h-full rounded-full bg-gray-300"></div>
                </div>
                <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))
          ) : stories.length > 0 ? (
            getSortedStories().map((story, index) => (
              <div
                key={`${story.storyId}-${story._originalIndex}`}
                className="flex flex-col justify-center items-center min-w-[50px]"
              >
                <div
                  className={`p-[3px] w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mb-1 ${story.viewed ? 'border-2 border-white bg-slate-200' : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'}`}
                  onClick={() => {
                    setStoryModalOpen(true);
                    setStoryModalIndex(index);
                    setSortedStoriesForModal(getSortedStories());
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={story.profilePicture}
                    alt={story.userId}
                    className="object-cover w-full h-full rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-xs text-center max-w-[60px] truncate">{story.userId}</span>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full text-gray-500">
              <span className="text-sm">No stories available</span>
            </div>
          )}
        </div>
        {isOverflowing && canScrollRight && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full  p-1"
            onClick={() => scrollRef.current.scrollBy({ left: 261, behavior: 'smooth' })}
            type="button"
          >
            <i className="fa-solid fa-circle-chevron-right text-2xl text-white"></i>
          </button>
        )}
      </div>
      {storyModalOpen && (
        <StoryModal
          stories={sortedStoriesForModal}
          initialIndex={storyModalIndex}
          onClose={() => setStoryModalOpen(false)}
          onStoryViewed={handleStoryViewed}
        />
      )}
    </>
  );
} 