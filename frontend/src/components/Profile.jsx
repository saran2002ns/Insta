import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';
import { sampleUsers, posts } from '../db/DB';
// import SideBar from '../SideBar'; // Uncomment if you have a SideBar component
// import { useParams } from 'react-router-dom'; // Uncomment if using react-router
// import axios from 'axios'; // Uncomment if you have axios installed
// import Follower from '../Follower'; // Placeholder for Follower component
// import UserPosts from './UserPosts'; // Placeholder for UserPosts component
// import UserReels from './UserReels'; // Placeholder for UserReels component
import PostInfo from './PostInfo';

// Placeholder components for demonstration
const Follower = ({ id, totalPost }) => (
  <div className="flex gap-8 mt-4 text-sm">
    <span><span className="font-semibold">{totalPost}</span> posts</span>
    <span><span className="font-semibold">340</span> followers</span>
    <span><span className="font-semibold">180</span> following</span>
  </div>
);
const UserPosts = ({ posts, setSelectedPostImages, setShowPostInfo }) => (
  <div className="grid grid-cols-3 gap-2 p-6">
    {posts.map((post, i) => (
      <div
        key={i}
        className="aspect-square bg-gray-100 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer"
        onClick={() => {
          setSelectedPostImages([post.imageUrl]);
          setShowPostInfo(true);
        }}
      >
        <img
          src={post.imageUrl}
          alt={`Post ${i}`}
          className="object-cover w-full h-full"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-4 text-white text-lg font-semibold">
            <span className="flex items-center">
              <i className="fa-solid fa-heart mr-2"></i>
              {post.likeCount}
            </span>
            <span className="flex items-center">
              <i className="fa-solid fa-comment mr-2"></i>
              {post.commentCount}
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

// const API = 'http://localhost:8080/api';
function Profile({ noSidebarSelection }) {
  const { username } = useParams();
  const location = useLocation();
  const isOwnProfile = location.pathname === '/profile';
  // Mock profile for demo if no username param
  const mockUser = {
    userIdName: 'demo_user',
    userName: 'Demo User',
    profilePictureUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'This is a demo profile.\nShowcasing mock data for the homepage profile.',
    website: 'https://example.com',
    location: 'Demo City',
    posts: 3,
    followers: 1234,
    following: 56,
    isVerified: true,
  };
  const mockPosts = [
    { imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', caption: 'Demo Post 1', likeCount: 10, commentCount: 2 },
    { imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', caption: 'Demo Post 2', likeCount: 20, commentCount: 4 },
    { imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', caption: 'Demo Post 3', likeCount: 30, commentCount: 6 },
  ];

  const [user, setUser] = useState(username ? sampleUsers.find(u => u.username === username) : mockUser);
  const [userPosts, setUserPosts] = useState(username ? posts.filter(post => post.user.username === username) : mockPosts);
  const [selectedTab, setSelectedTab] = useState('posts');
  const [showPostInfo, setShowPostInfo] = useState(false);
  const [selectedPostImages, setSelectedPostImages] = useState([]);

  useEffect(() => {
    // Update user and posts when username changes (or is the same and re-navigated)
    setUser(username ? sampleUsers.find(u => u.username === username) : mockUser);
    setUserPosts(username ? posts.filter(post => post.user.username === username) : mockPosts);
    setSelectedTab('posts'); // Optionally reset tab
    setShowPostInfo(false); // Optionally close post info
    setSelectedPostImages([]);
  }, [username]);

  if (!user) return <div className="p-8">User not found.</div>;

  return (
    <>
      {showPostInfo && (
        <PostInfo
          imageUrls={selectedPostImages}
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
            <UserPosts posts={userPosts} setSelectedPostImages={setSelectedPostImages} setShowPostInfo={setShowPostInfo} />
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