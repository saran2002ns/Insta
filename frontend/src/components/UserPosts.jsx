import React from 'react';

function UserPosts({ posts, setSelectedPost, setShowPostInfo }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <i className="fa-regular fa-image text-6xl mb-4" />
        <span className="text-lg">No posts</span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-2 p-6">
      {posts.map((post, i) => (
        <div
          key={post.postId || i}
          className="aspect-square bg-gray-100 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer"
          onClick={() => {
            if (setSelectedPost) setSelectedPost(post);
            if (setShowPostInfo) setShowPostInfo(true);
          }}
        >
          {post.mediaType === 'video' ? (
            <video
              src={post.mediaUrl}
              className="object-cover w-full h-full"
              muted
              playsInline
              loop
            />
          ) : (
            <img
              src={post.mediaUrl}
              alt={`Post ${post.postId || i}`}
              className="object-cover w-full h-full"
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex space-x-4 text-white text-lg font-semibold">
              <span className="flex items-center">
                <i className="fa-solid fa-heart mr-2"></i>
                {post.likes}
              </span>
              <span className="flex items-center">
                <i className="fa-solid fa-comment mr-2"></i>
                {Array.isArray(post.comments) ? post.comments.length : post.comments}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPosts; 