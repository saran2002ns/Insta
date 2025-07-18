import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function PostInfo({ imageUrls, onClose, post }) {
  if (!post) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-500">No post data available.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
        </div>
      </div>
    );
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [liked, setLiked] = useState(post.liked || false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [saved, setSaved] = useState(post.saved || false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };
  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;
    // For demo, use a mock user for the new comment
    const newComment = {
      user: {
        username: "demo_user",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg"
      },
      text: commentInput.trim(),
    };
    setComments((prev) => [...prev, newComment]);
    setCommentInput("");
  };
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
      {/* Overlay Box */}
      <div className="bg-white w-[90%] h-[90%] flex rounded-lg overflow-hidden shadow-lg relative">
        {/* Left: Image/Video Viewer */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          {post && post.type === 'video' ? (
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={() => {
                const video = document.getElementById('postinfo-video');
                if (video) {
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }
              }}
            >
              <video
                id="postinfo-video"
                src={post.src}
                autoPlay
                playsInline
                loop
                className="w-full h-full object-contain bg-black rounded-xl shadow-lg"
                onPlay={() => setIsPaused(false)}
                onPause={() => setIsPaused(true)}
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
              src={post ? post.src : imageUrls[currentIndex]}
              alt="post"
              className="w-full h-full object-contain bg-black"
            />
          )}
        </div>

        {/* Right: Post Details */}
        <div className="w-[400px] flex flex-col border-l border-gray-200 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <img
                src={post.user?.avatar || 'https://randomuser.me/api/portraits/men/75.jpg'}
                className="w-8 h-8 rounded-full"
                alt="user"
              />
              <span className="font-semibold">{post.user?.username || 'Unknown User'}</span>
            </div>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {comments && comments.length > 0 ? (
              comments.map((comment, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <img src={comment.user.avatar} alt={comment.user.username} className="w-6 h-6 rounded-full" />
                  <span className="font-semibold text-sm">{comment.user.username}</span>
                  <span className="text-gray-700 text-sm">{comment.text}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">No comments yet.</div>
            )}
          </div>
          <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center pl-2 gap-4">
           
                    <button
                      className="hover:scale-110 transition-transform"
                      aria-label="Like"
                      onClick={handleLike}
                    >
                      {liked ? (
                        <i className="fa-solid fa-heart text-2xl text-red-500"></i>
                      ) : (
                        <i className="fa-regular fa-heart text-2xl"></i>
                      )}
                    </button>
                    <button className="hover:scale-110 transition-transform" aria-label="Comment"><i className="fa-regular fa-comment text-2xl"></i></button>
                    <button className="hover:scale-110 transition-transform" aria-label="Share"><i className="fa-regular fa-paper-plane text-2xl"></i></button>
                  </div>
                  <button
                    className="hover:scale-110 transition-transform pr-2"
                    aria-label="Save"
                    onClick={handleSave}
                  >
                    {saved ? (
                      <i className="fa-solid fa-bookmark text-2xl text-black"></i>
                    ) : (
                      <i className="fa-regular fa-bookmark text-2xl"></i>
                    )}
                  </button>
                </div>

          {/* Likes & Time */}
          <div className="px-4 text-sm text-gray-600">Liked by _luckyy_lad and {likes} others</div>
          <div className="px-4 text-xs text-gray-400 mb-2">October 28, 2023</div>

          {/* Comment Input */}
          <form className="p-4 border-t flex items-center gap-2" onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm"
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
            />
            <button type="submit" className="text-blue-500 font-semibold text-sm">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}
