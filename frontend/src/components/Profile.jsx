import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { user as loggedInUser ,getPosts,getSaves,getTags} from '../service/Api';
import PostInfo from './PostInfo';
import UserPosts from './UserPosts';


function Profile() {
  const { userId } = useParams();
  const location = useLocation();
  const [user, setUser] = useState( null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('posts');
  const [showPostInfo, setShowPostInfo] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isNoFollowPrivateProfile, setIsNoFollowPrivateProfile] = useState(false);
  const [followRequests, setFollowRequests] = useState({});
  const [imagePosts, setImagePosts] = useState([]);
  const [videoPosts, setVideoPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [taggedPosts, setTaggedPosts] = useState([]);
 
  useEffect(() => {
    let foundUser = location.state?.user;
    setUser(foundUser);
    setLoading(true);
    const fetchUserId = foundUser?.userId || userId;
   
    setShowPostInfo(false);
    setSelectedPost(null);
    setIsOwnProfile(loggedInUser && userId === loggedInUser.userId);
    setIsNoFollowPrivateProfile(!isOwnProfile && !foundUser?.followed && foundUser?.private);
    if(!isNoFollowPrivateProfile){
    getPosts(fetchUserId).then(data => {
      setUserPosts(data);
      setLoading(false);
    }).catch(() => {
      setUserPosts([]); // fallback to empty or you can import postData if you want
      setLoading(false);
    });
  }else{
    setUserPosts([]);
    setLoading(false);
  }
  }, [userId, location.state]);

  useEffect(() => {
   handlePosts();
  }, [userPosts]);



  const handleFollow = () => {
    if (followRequests[user.userId]) {
      setFollowRequests(prev => {
        const updated = { ...prev };
        delete updated[user.userId];
        return updated;
      });
    } else if (user.followed) {
      setUser(prev => ({ ...prev, followed: false }));
    } else if (user.private) {
      setFollowRequests(prev => ({ ...prev, [user.userId]: true }));
    } else {
      setUser(prev => ({ ...prev, followed: true }));
    }
  };
  const handlePosts =()=>{
    setImagePosts(userPosts.filter(post => post.mediaType === 'image'));
    setSelectedTab('posts');
  }
  const handleReels =()=>{
    setVideoPosts(userPosts.filter(post => post.mediaType === 'video'));
    setSelectedTab('reels');
  }
  const handleSaved =()=>{
    if(!isNoFollowPrivateProfile){
    getSaves().then(data =>{ 
      setSavedPosts(data);
    }).catch(()=>{
      setSavedPosts(postData);
    });
  }else{
    setSavedPosts([]);
    setLoading(false);
  }
  setSelectedTab('saved')

  }
  const handleTag =()=>{
    if(!isNoFollowPrivateProfile){
    getTags(user.userId).then(data =>{ 
      setTaggedPosts(data);
    }).catch(()=>{
      setTaggedPosts(postData);
    });
  }else{
    setTaggedPosts([]);
    setLoading(false);
  }
  setSelectedTab('tagged')
  }

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
      <div className="max-w-full p-6 font-sans">
        {/* Profile Header */}
        <div className="max-w-3xl flex items-center gap-12 mb-8 mx-auto">
          <img src={user.profilePicture} className="w-44 h-44 rounded-full object-cover border" alt={user.userId} />
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-light">{user.userName}</span>
              <div className="font-semibold  ">{user.userId}</div>
              {!isOwnProfile && (
                <button
                  className={`px-4 py-1 ml-4 rounded text-sm border font-semibold transition-colors duration-150 ${
                    followRequests[user.userId]
                      ? 'bg-transparent text-gray-500 border-gray-300'
                      : user.followed
                        ? 'bg-transparent text-gray-500 border-gray-300'
                        : 'bg-transparent text-blue-400 border-gray-300'
                  }`}
                  onClick={handleFollow}
                >
                  {followRequests[user.userId]
                    ? 'Requested'
                    : user.followed
                      ? 'Following'
                      : 'Follow'}
                </button>
              )}
              {isOwnProfile && (
                <button className="px-4 py-1 ml-4 rounded text-sm border font-semibold">Edit Profile</button>
              )}
            </div>
            <div className="flex gap-8 mb-2">
              <span><b>{user.totalPosts}</b> posts</span>
              <span><b>{user.totalFollowers}</b> followers</span>
              <span><b>{user.totalFollowing}</b> following</span>
            </div>
            {!isNoFollowPrivateProfile && (
              <div className="text-sm">
                <div className="font-semibold">{user.username}</div>
                <div>@{user.userId}</div>
                <div>{user.bio}</div>
                {/* {user.website && (
                  <a href={user.websiteUrl} className="text-blue-500 hover:underline block" target="_blank" rel="noopener noreferrer">{user.websiteUrl}</a>
                )} */}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-b  space-x-12 text-sm font-semibold mb-4 flex justify-around">
          <div
            className={`flex flex-col items-center cursor-pointer px-4 ${selectedTab === 'posts' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => handlePosts() }
          >
            <i className="fa-solid fa-table-columns text-xl"></i>
            {selectedTab === 'posts' && <div className="w-16 h-1 bg-black rounded-full mt-1" />}
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer px-4 ${selectedTab === 'reels' ? 'text-black' : 'text-gray-400'}`}
            onClick={() =>handleReels() }
          >
            <i className="fa-solid fa-play text-xl"></i>
            {selectedTab === 'reels' && <div className="w-16 h-1 bg-black rounded-full mt-1" />}
          </div>
          {isOwnProfile && (
            <div
              className={`flex flex-col items-center cursor-pointer px-4 ${selectedTab === 'saved' ? 'text-black' : 'text-gray-400'}`}
              onClick={() =>handleSaved() }
            >
              <i className="fa-solid fa-bookmark text-xl"></i>
              {selectedTab === 'saved' && <div className="w-16 h-1 bg-black rounded-full mt-1" />}
            </div>
          )}
          <div
            className={`flex flex-col items-center cursor-pointer px-4 ${selectedTab === 'tagged' ? 'text-black' : 'text-gray-400'}`}
            onClick={() =>handleTag() }
          >
            <i className="fa-solid fa-user-tag text-xl"></i>
            {selectedTab === 'tagged' && <div className="w-16 h-1 bg-black rounded-full mt-1" />}
          </div>
        </div>

        {/* Posts Grid or Private Message */}
        {isNoFollowPrivateProfile ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <i className="fa-solid fa-lock text-5xl mb-4" />
            <span className="text-lg">This account is private</span>
            <span className="text-sm">Follow to see their photos and videos.</span>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-3 gap-2 p-6">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div key={idx} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {selectedTab === 'posts' && (
              <UserPosts posts={imagePosts} setSelectedPost={setSelectedPost} setShowPostInfo={setShowPostInfo} />
            )}
            {selectedTab === 'reels' && (
              <UserPosts posts={videoPosts} setSelectedPost={setSelectedPost} setShowPostInfo={setShowPostInfo} />
            )}
            {selectedTab === 'saved' && isOwnProfile && (
              <UserPosts posts={savedPosts} setSelectedPost={setSelectedPost} setShowPostInfo={setShowPostInfo} />
            )}
            {selectedTab === 'tagged' && (
              <UserPosts posts={taggedPosts} setSelectedPost={setSelectedPost} setShowPostInfo={setShowPostInfo} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Profile; 