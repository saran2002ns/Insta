const API = 'http://localhost:8080/api/';
export let userId="mira_lennox";
export let pageFeeds=0;
export let pageReels=0;
export let user={
    "userId": "mira_lennox",
    "profilePicture": "https://cdn.pixabay.com/photo/2021/03/02/16/34/woman-6063087_1280.jpg",
    "username": "Mira Lennox",
    "bio": "Photographer and tea collector.",
    "totalPosts": 11,
    "totalFollowers": 5,
    "totalFollowing": 5,
    "private": false,
    "followed": true
  };
// Function to set userId
export const setUserId = (newUserId) => {
  // getUser(newUserId); // Removed because getUser is not defined
  userId = newUserId;
};

const setUser = (newUser) => {
    user = newUser;
};

export const getComments=async(postId)=>{
    const COMMENTS=API+`comments/${postId}`;
    try{
        const response=await fetch(COMMENTS);       
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
}
export const getSuggections=async()=>{
    const suggestions=API+`users/${userId}/suggestions`;
    try{
        const response=await fetch(suggestions);       
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
}

export const getFollowers=async(userId)=>{
    const FOLLOWERS=API+`follows/followers/${userId}`;
    try{
        const response=await fetch(FOLLOWERS);
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
}
export const getFollowing=async(userId)=>{
    const FOLLOWING=API+`follows/following/${userId}`;
    try{
        const response=await fetch(FOLLOWING);
        const data=await response.json();
        return data;
    }catch(error){
       return error;
    }
}
export const getIsFollower=async(userId1)=>{
    const IS_FOLLOWER=API+`follows?user1=${userId1}&user2=${userId}`;
    try{
        const response=await fetch(IS_FOLLOWER);
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
}
export const getLikes=async(postId)=>{
    const LIKES=API+`likes/${postId}`;
    try{
        const response=await fetch(LIKES);
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
}
export const getNotifications=async()=>{
    const NOTIFICATIONS=API+`notifications/${userId}`;
    try{
        const response=await fetch(NOTIFICATIONS);
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
}
export const getPosts=async(userId2)=>{
    const POSTS=API+`posts/${userId2}?loggedInUserId=${userId}`;
    console.log('POSTS',POSTS);
    try{
        const response=await fetch(POSTS);
        const data=await response.json();
        console.log('data',data);
        return data;
    }catch(error){
        return error;
    }
}
export const getPostsOfUser=async(userId,postId)=>{
    const POSTS_OF_USER=API+`posts/${userId}/${postId}`;
    try{
        const response=await fetch(POSTS_OF_USER);
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
}
export const getFeeds=async(page)=>{
    const FEEDS=API+`posts/feeds/${userId}?page=${0}`;
    try{
        const response=await fetch(FEEDS);
        const data=await response.json();
        // pageFeeds=page+1;
        return data;
    }catch(error){
        return error;
    }
}    
export const getReels=async(page)=>{
    const REELS=API+`posts/reels/${userId}?page=${0}`;
    try{
        const response=await fetch(REELS);
        const data=await response.json();
        // pageReels=page+1;
        return data;
    }catch(error){
        return error;
    }
}
export const getSaves=async()=>{
    const SAVES=API+`saves/${userId}`;
    try{
        const response=await fetch(SAVES);
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
}
export const getTags=async(userId)=>{
    const TAGS=API+`tags/${userId}`;
    try{
        const response=await fetch(TAGS);
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
}
export const getSearch=async(query)=>{
    const SEARCH=API+`search/${query}?loggedInUserId=${userId}`;
    try{
        const response=await fetch(SEARCH);
        const data=await response.json();
        return data;
    }catch(error){  
        return error;
    }
}
export const getStories=async()=>{
    const STORIES=API+`stories/${userId}`;
    try{
        const response=await fetch(STORIES);    
        const data=await response.json();
        return data;
    }catch(error){
        return error;
    }
};