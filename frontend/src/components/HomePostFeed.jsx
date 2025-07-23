import React, { useState, useEffect } from 'react';
import PostInfo from './PostInfo';
import { getFeeds } from '../service/Api';
import { postData } from '../service/DB';

export default function HomePostFeed() {
  const [feedPosts, setFeedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFeeds().then(data => {
      setFeedPosts(data);
      setLoading(false);
    }).catch(() => {
      setFeedPosts(postData);
      setLoading(false);
    });
  }, []);

  // Like button handler
  const handleLike = (postId) => {
    setFeedPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.postId === postId) {
          const liked = !post.liked;
          const likes = liked ? post.likes + 1 : post.likes - 1;
          return { ...post, liked, likes };
        }
        return post;
      })
    );
  };

  // Save button handler
  const handleSave = (postId) => {
    setFeedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, saved: !post.saved } : post
      )
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full mt-6">
      {loading ? (
        Array.from({ length: 4 }).map((_, idx) => (
          <div key={`loading-post-${idx}`} className="bg-white px-4 md:px-10 py-6 rounded-lg animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
              <div className="flex-1 h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full ml-auto"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))
      ) : (
        feedPosts.slice(0, visibleCount).map((post) => (
          <div key={post.postId} className="bg-white px-4 md:px-10">
            <div className="flex items-center px-2 py-3">
              <img
                src={post.user.profilePicture}
                alt={post.user.userId}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPost(post)}
              />
              <div className="ml-3 flex-1">
                <span className="font-semibold text-gray-800 text-sm cursor-pointer" onClick={() => setSelectedPost(post)}>
                  {post.user.userId}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-100 flex items-center justify-center" style={{ minHeight: 300 }}>
              {post.mediaType === 'video' ? (
                <video src={post.mediaUrl} controls className="w-full max-h-[500px] object-contain" />
              ) : (
                <img src={post.mediaUrl} alt={post.caption} className="w-full max-h-[500px] object-contain" />
              )}
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Like"
                  onClick={() => handleLike(post.postId)}
                >
                  {post.liked ? (
                    <i className="fa-solid fa-heart text-2xl text-red-500"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-2xl"></i>
                  )}
                </button>
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Comment"
                  onClick={() => setSelectedPost(post)}
                >
                  <i className="fa-regular fa-comment text-2xl"></i>
                </button>
                <button
                  className="hover:scale-110 transition-transform"
                  aria-label="Share"
                  onClick={() => { /* Placeholder for share functionality */ }}
                >
                  <i className="fa-regular fa-paper-plane text-2xl"></i>
                </button>
              </div>
              <button
                className="hover:scale-110 transition-transform"
                aria-label="Save"
                onClick={() => handleSave(post.postId)}
              >
                {post.saved ? (
                  <i className="fa-solid fa-bookmark text-2xl text-black"></i>
                ) : (
                  <i className="fa-regular fa-bookmark text-2xl"></i>
                )}
              </button>
            </div>
            <div className="font-semibold text-gray-800 text-sm mb-1">{post.likes} likes</div>
            <div className="mb-1">
              <span className="font-semibold text-gray-800 mr-2 text-sm">{post.user.userId}</span>
              <span className="text-gray-700 text-sm">{post.caption}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1 cursor-pointer" onClick={() => setSelectedPost(post)}>
              View all {post.comments} comments
            </div>
            <div className="text-xs text-gray-400">{post.createdAt}</div>
          </div>
        ))
      )}
      {selectedPost && (
        <PostInfo post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
} 