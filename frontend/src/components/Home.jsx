import React, { useRef, useState, useEffect } from 'react';
import { sampleUsers ,posts,stories} from '../db/DB';
import { useNavigate } from 'react-router-dom';
import StoryModal from './StoryModal';


function Home() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const currentUser = sampleUsers[0];
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [storyModalIndex, setStoryModalIndex] = useState(0);
  const [localStories, setLocalStories] = useState(stories.map(s => ({ ...s })));
  // State to hold the sorted stories for the modal
  const [sortedStoriesForModal, setSortedStoriesForModal] = useState([]);

  // Callback to mark a story as viewed from StoryModal
  const handleStoryViewed = (index) => {
    setLocalStories(prev => {
      if (prev[index]?.viewed) return prev;
      const updated = [...prev];
      updated[index] = { ...updated[index], viewed: true };
      return updated;
    });
  };

  // Helper to get sorted stories as displayed
  const getSortedStories = () => {
    return localStories
      .map((story, idx) => ({ ...story, _originalIndex: idx }))
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
    update();
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      // Check if user is near the bottom of the page
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        visibleCount < posts.length
      ) {
        setVisibleCount((prev) => Math.min(prev + 5, posts.length));
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -261, behavior: 'smooth' });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 261, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Center Feed */}
      <main className="flex-1 flex flex-col items-center mx-auto max-w-[38rem] w-full ">
        {/* Stories Bar */}
        <div className="relative bg-white w-full h-28  overflow-hidden flex items-center">
          {isOverflowing && canScrollLeft && (
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full  p-1"
              onClick={scrollLeft}
              type="button"
            >
              <i className="fa-solid fa-circle-chevron-left text-2xl text-white"></i>
            </button>
          )}
          <div
            ref={scrollRef}
            className="flex items-center h-full overflow-x-auto scroll-smooth no-scrollbar px-4 space-x-9 w-full"
          >
            {getSortedStories().map((story, index, arr) => (
              <div
                key={`${story.id}-${story._originalIndex}`}
                className="flex flex-col justify-center items-center min-w-[50px]"
              >
                <div
                  className={`p-[3px] w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mb-1 ${story.viewed ? 'border-2 border-white bg-slate-200' : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'}`}
                  onClick={() => {
                    setStoryModalOpen(true);
                    // Open modal with sorted stories and correct index
                    setStoryModalIndex(index);
                    setSortedStoriesForModal(getSortedStories());
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="object-cover w-full h-full rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-xs text-center max-w-[60px] truncate">{story.name}</span>
              </div>
            ))}
          </div>
          {isOverflowing && canScrollRight && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full  p-1"
              onClick={scrollRight}
              type="button"
            >
              <i className="fa-solid fa-circle-chevron-right text-2xl text-white"></i>
            </button>
          )}
        </div>
        {/* Posts Feed */}
        <div className="flex flex-col gap-8 w-full mt-6">
          {posts.slice(0, visibleCount).map((post) => (
            <div key={post.id} className="bg-white px-10">
              <div className="flex items-center px-2 py-3">
                <img src={post.user.avatar} alt={post.user.username} className="w-9 h-9 rounded-full mr-3" />
                <span className="font-semibold text-gray-800 text-sm mr-1">{post.user.username}</span>
                {post.user.isVerified && (
                  <svg className="w-4 h-4 text-blue-500 inline ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12l-2-2-2 2-2-2-2 2-2-2-2 2-2-2-2 2v2l2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2v-2z" /></svg>
                )}
                <span className="ml-auto text-xs text-gray-400">• {post.time}</span>
              </div>
              <img src={post.image} alt="post" className="w-full max-h-[500px] rounded-md object-cover" />
              <div className="py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
           
                    <button className="hover:scale-110 transition-transform" aria-label="Like"><i className="fa-regular fa-heart text-2xl"></i></button>
                    <button className="hover:scale-110 transition-transform" aria-label="Comment"><i className="fa-regular fa-comment text-2xl"></i></button>
                    <button className="hover:scale-110 transition-transform" aria-label="Share"><i className="fa-regular fa-paper-plane text-2xl"></i></button>
                  </div>
                  <button className="hover:scale-110 transition-transform" aria-label="Save"><i className="fa-regular fa-bookmark text-2xl"></i></button>
                </div>
                <div className="font-semibold text-gray-800 text-sm mb-1">{post.likes} likes</div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-800 mr-2 text-sm">{post.user.username}</span>
                  <span className="text-gray-700 text-sm">{post.caption}</span>
                </div>
                <div className="text-xs text-gray-500 mb-1 cursor-pointer">View all {post.comments.length} comments</div>
                <div className="text-xs text-gray-400">{post.time}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* Right Sidebar */}
      <aside className="hidden xl:flex flex-col w-full ml-12 mt-8 pt-2">
        {/* Current User */}
        <div className="flex items-center mb-6">
          <img src={currentUser.avatar} alt={currentUser.username} className="w-12 h-12 rounded-full mr-3" />
          <div>
            <div className="font-semibold text-gray-800 text-sm">{currentUser.username}</div>
            <div className="text-xs text-gray-500">Saran</div>
          </div>
         
        </div>
        {/* Suggestions */}
        <div className="  p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Suggested for you</h3>
            <button className="text-xs text-gray-700 font-semibold hover:underline">See All</button>
          </div>
          <div className="flex flex-col gap-4">
            {sampleUsers.slice(1, 6).map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={user.avatar} alt={user.username} className="w-9 h-9 rounded-full mr-3" />
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{user.username}</div>
                    <div className="text-xs text-gray-500">{user.fullName}</div>
                  </div>
                </div>
                <button className="text-blue-500 font-semibold text-xs hover:underline">Follow</button>
              </div>
            ))}
          </div>
        </div>
      </aside>
      {storyModalOpen && (
        <StoryModal
          stories={sortedStoriesForModal}
          initialIndex={storyModalIndex}
          onClose={() => setStoryModalOpen(false)}
          onStoryViewed={handleStoryViewed}
        />
      )}
    </div>
  );
}

export default Home;