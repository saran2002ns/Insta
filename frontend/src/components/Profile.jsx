import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { sampleUsers, posts, mockUser, mockPosts } from '../db/DB';
import PostInfo from './PostInfo';

// Placeholder components for demonstration
// const Follower = ({ id, totalPost }) => (
//   <div className="flex gap-8 mt-4 text-sm">
//     <span><span className="font-semibold">{totalPost}</span> posts</span>
//     <span><span className="font-semibold">340</span> followers</span>
//     <span><span className="font-semibold">180</span> following</span>
//   </div>
// );
const UserPosts = ({ posts, setSelectedPost, setShowPostInfo }) => (
  <div className="grid grid-cols-3 gap-2 p-6">
    {posts.map((post, i) => (
      <div
        key={i}
        className="aspect-square bg-gray-100 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer"
        onClick={() => {
          setSelectedPost(post);
          setShowPostInfo(true);
        }}
      >
        <img
          src={post.image || post.imageUrl}
          alt={`Post ${i}`}
          className="object-cover w-full h-full"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-4 text-white text-lg font-semibold">
            <span className="flex items-center">
              <i className="fa-solid fa-heart mr-2"></i>
              {post.likes || post.likeCount}
            </span>
            <span className="flex items-center">
              <i className="fa-solid fa-comment mr-2"></i>
              {(post.comments && post.comments.length) || post.commentCount || 0}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);
const UserReels = ({ posts }) => (
  <div className="grid grid-cols-3 gap-2 p-6">
    {posts.map((post, i) => (
      <div key={i} className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
        <span className="text-gray-500">Reel {i + 1}</span>
      </div>
    ))}
  </div>
);

function Profile({ noSidebarSelection }) {
  const { username } = useParams();
  const location = useLocation();
  const isOwnProfile = location.pathname === '/profile';



  const [user, setUser] = useState(username ? sampleUsers.find(u => u.username === username) : mockUser);
  const [userPosts, setUserPosts] = useState(username ? posts.filter(post => post.user.username === username) : mockPosts);
  const [selectedTab, setSelectedTab] = useState('posts');
  const [showPostInfo, setShowPostInfo] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Update user and posts when username changes (or is the same and re-navigated)
    setUser(username ? sampleUsers.find(u => u.username === username) : mockUser);
    setUserPosts(username ? posts.filter(post => post.user.username === username) : mockPosts);
    setSelectedTab('posts'); // Optionally reset tab
    setShowPostInfo(false); // Optionally close post info
    setSelectedPost(null);
  }, [username]);

  if (!user) return <div className="p-8">User not found.</div>;

  return (
    <>
      {showPostInfo && selectedPost && (
        <PostInfo
          post={selectedPost}
          imageUrls={[selectedPost.image || selectedPost.imageUrl]}
          onClose={() => setShowPostInfo(false)}
        />
      )}
      <div className="max-w-full mx-auto  px-2 font-mono">
        <div className="bg-white text-black p-2 min-h-screen">
          <div className="flex flex-row items-center sm:items-start gap-8 mb-8 p-2 ml-14">
            {/* Avatar */}
            <div
              className="w-44 h-44 mt-3 rounded-full bg-cover bg-center mr-10 border-2 border-gray-300"
              style={{ backgroundImage: `url('${user.profilePictureUrl}')` }}
            ></div>

            {/* Profile Info */}
            <div>
              {/* Username and buttons */}
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-2xl font-semibold flex items-center">
                  {user.userIdName}
                  {user.isVerified && (
                    <svg className="w-5 h-5 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a1 1 0 01-.894-.553l-1.382-2.764-3.053-.444a1 1 0 01-.554-1.706l2.21-2.154-.522-3.045A1 1 0 016.6 6.293l2.74-.398 1.225-2.482a1 1 0 011.79 0l1.225 2.482 2.74.398a1 1 0 01.555 1.706l-2.21 2.154.522 3.045a1 1 0 01-1.45 1.054l-2.74-.398-1.225 2.482A1 1 0 0110 18z" clipRule="evenodd" /></svg>
                  )}
                  {/* {isOwnProfile && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">This is your profile</span>
                  )} */}
                </h1>
                {isOwnProfile ?(
                  <>
                    <button className="bg-gray-100 px-4 py-1 rounded text-sm">Edit profile</button>
                    <button className="bg-gray-100 px-4 py-1 rounded text-sm">View archive</button>
                  </>
                ):<div className="px-4 py-1 m-4"/>}
              </div>

              {/* Follower info */}
              <div className="flex space-x-4 text-sm">
                <p><strong>{user.posts !== undefined ? user.posts : userPosts.length}</strong> posts</p>
                <p><strong>{(user.followers !== undefined ? user.followers : 0).toLocaleString()}</strong> followers</p>
                <p><strong>{user.following !== undefined ? user.following : 0}</strong> following</p>
              </div>

              {/* Bio */}
              <div className="mt-4 text-sm leading-5">
                <p className="font-semibold">{user.userName}</p>
                <p>@{user.userIdName}</p>
                <p className="whitespace-pre-line">{user.bio}</p>
                {user.website && (
                  <a href={user.website} className="text-blue-500 hover:underline block" target="_blank" rel="noopener noreferrer">{user.website}</a>
                )}
                {user.location && (
                  <p className="text-gray-500">{user.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-b flex justify-around space-x-6 text-sm py-2 font-semibold">
            <div
              className={`flex flex-col items-center cursor-pointer px-4 ${selectedTab === 'posts' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setSelectedTab('posts')}
            >
              <i className={`fa-solid fa-table-columns text-xl ${selectedTab === 'posts' ? '' : ''}`}></i>
              {selectedTab === 'posts' && <div className="w-16 h-1 bg-black rounded-full mt-1" />}
            </div>
            <div
              className={`flex flex-col items-center cursor-pointer px-4 ${selectedTab === 'reels' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setSelectedTab('reels')}
            >
              <i className={`fa-solid fa-play text-xl ${selectedTab === 'reels' ? '' : ''}`}></i>
              {selectedTab === 'reels' && <div className="w-16 h-1 bg-black rounded-full mt-1" />}
            </div>
            {isOwnProfile && <div
              className={`flex flex-col items-center cursor-pointer px-4 ${selectedTab === 'saved' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setSelectedTab('saved')}
            >
              <i className={`fa-solid fa-bookmark text-xl ${selectedTab === 'saved' ? '' : ''}`}></i>
              {selectedTab === 'saved' && <div className="w-16 h-1 bg-black rounded-full mt-1" />}
            </div> }
            <div
              className={`flex flex-col items-center cursor-pointer px-4 ${selectedTab === 'tagged' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setSelectedTab('tagged')}
            >
              <i className={`fa-solid fa-user-tag text-xl ${selectedTab === 'tagged' ? '' : ''}`}></i>
              {selectedTab === 'tagged' && <div className="w-16 h-1 bg-black rounded-full mt-1" />}
            </div>
          </div>

          {/* Tab Content */}
          {selectedTab === 'posts' && (
            <UserPosts posts={userPosts} setSelectedPost={setSelectedPost} setShowPostInfo={setShowPostInfo} />
          )}
          {selectedTab === 'reels' && (
            <UserReels posts={userPosts} />
          )}
          {selectedTab === 'saved' && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <i className="fa-solid fa-bookmark text-6xl mb-4" />
              <span className="text-lg">No saved posts yet</span>
            </div>
          )}
          {selectedTab === 'tagged' && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <i className="fa-solid fa-user-tag text-6xl mb-4" />
              <span className="text-lg">No tagged posts yet</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile; 