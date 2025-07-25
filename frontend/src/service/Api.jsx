import { useState } from 'react';
import { reelTags, reelLocations, reelData } from '../service/DB';
const API = 'http://localhost:8080/api/';
let userId="mira_lennox";
export let pageFeeds=0;
export let pageReels=0;
let user=null;
function setUser(newUser){
    user=newUser;
    userId=newUser.userId;
}

export function getUser(){
    if(user==null){
        setUser(JSON.parse(localStorage.getItem('user')));
    }
    if(user==null){
        setUser({
            "userId": "mira_lennox",
            "profilePicture": "https://cdn.pixabay.com/photo/2021/03/02/16/34/woman-6063087_1280.jpg",
            "username": "Mira Lennox",
            "bio": "Photographer and tea collector.",
            "posts": 11,
        });
    }
    return user;
}
export const viewStory=async(storyId)=>{
    const VIEW_STORY=API+`stories/${storyId}/view?loggedInUserId=${userId}`;
    console.log('VIEW_STORY',VIEW_STORY);
    try{
        const response=await fetch(VIEW_STORY , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add auth headers here if needed
            },
            
          });
        const data=await response.json();
        console.log('view story data',data);
        return data;
    }catch(error){
        console.log('error',error);
    }
}
export const removeFollower=async(userId1,userId2)=>{
    const UNFOLLOW=API+`follows`;
    console.log('removeFollower',UNFOLLOW);
    try{    
        const response=await fetch(UNFOLLOW, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                // Add auth headers here if needed
            },
            body: JSON.stringify( { userId: userId2, loggedInUserId: userId1 }),
        });
        const data=await response.json();
        console.log('removeFollower data',data);
        return data;
    }catch(error){
        console.log('error',error);
    }
}
export const removeTag=async(postId)=>{
    const TAG=API+`tags/${postId}?loggedInUserId=${userId}`
    console.log('TAG',TAG);
    try{
        const response= await fetch(TAG, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Add auth headers here if needed
            },
            
          });
        const data=await response.json();
        console.log('removeTag',data.message);
        return data;
    }catch(error){
        console.log('error',error);
    }
}
// Function to set userId
export const deletePost=async(postId)=>{
     const POST=API+`posts/${postId}`
    console.log('POST',POST);
    try{
        const response= await fetch(POST, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Add auth headers here if needed
            },
            
          });
        const data=await response.json();
        console.log('deletpost',data);
        return data;
    }catch(error){
        console.log('error',error);
    }
}

export const login=async(userId,password)=>{
    const LOGIN=API+`users/login`;
    console.log('LOGIN',LOGIN);
    try{
        const response=await fetch(LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add auth headers here if needed
            },
            body: JSON.stringify( { userId: userId, password: password }),
        });
        const data=await response.json();
        setUser(data); 
        return data;
    }catch(error){
        console.log('error',error);
    }
}
    
export const setLike=async(postId)=>{
    const LIKE=API+`likes`;
    console.log('LIKE',LIKE);
    try{
        const response=await fetch(LIKE, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add auth headers here if needed
            },
            body: JSON.stringify( { postId: postId, userId: userId }),
          });
        const data=await response.json();
        console.log('like data',data);
      
        return data;
    }catch(error){
        console.log('error',error);
    }
}
export const setUnlike=async(postId)=>{
    const UNLIKE=API+`likes`;
    console.log('UNLIKE',UNLIKE);
    try{
        const response= await fetch(UNLIKE, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Add auth headers here if needed
            },
            body:  JSON.stringify(  { postId: postId, userId: userId }),
          });
        const data=await response.json();
        console.log('like data',data);
        return data;
    }catch(error){
        console.log('error',error);
    }
}
export const setComment=async(postId,comment)=>{
    const COMMENT=API+`comments`;
    console.log('COMMENT',COMMENT);
    try{
        const response=await fetch(COMMENT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add auth headers here if needed
            },
            body: JSON.stringify( { postId: postId, userId: userId, commentText: comment }),
        });
        const data=await response.json();
        console.log('comment data',data); 
        return data;
    }catch(error){
        console.log('error',error);
    }
}
export const setSave=async(postId)=>{
    const SAVE=API+`saves`;
    console.log('SAVE',SAVE);
    try{
        const response=await fetch(SAVE, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // Add auth headers here if needed
            },
            body: JSON.stringify( { postId: postId, userId: userId }),
        });
        const data=await response.json();
        console.log('save data',data); 
        return data;
    }catch(error){
        console.log('error',error);
    }
}
export const setUnsave=async(postId)=>{ 
    const UNSAVE=API+`saves`;
    console.log('UNSAVE',UNSAVE);
    try{
        const response=await fetch(UNSAVE, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                // Add auth headers here if needed
            },
            body: JSON.stringify( { postId: postId, userId: userId }),
        });
        const data=await response.json();
        console.log('save data',data);  
        return data;
    }catch(error){
        console.log('error',error);
    }
}
export const setFollow=async(userId2)=>{
    const FOLLOW=API+`follows`;
    console.log('FOLLOW',FOLLOW);
    try{
        const response=await fetch(FOLLOW, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // Add auth headers here if needed
            },
            body: JSON.stringify( { userId: userId2, loggedInUserId: userId }),
        });
        const data=await response.json();
        console.log('follow data',data);
        return data;
    }catch(error){
        console.log('error',error);
    }
}
export const setUnfollow=async(userId2)=>{
    const UNFOLLOW=API+`follows`;
    console.log('UNFOLLOW',UNFOLLOW);
    try{    
        const response=await fetch(UNFOLLOW, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                // Add auth headers here if needed
            },
            body: JSON.stringify( { userId: userId2, loggedInUserId: userId }),
        });
        const data=await response.json();
        console.log('unfollow data',data);
        return data;
    }catch(error){
        console.log('error',error);
    }
}
export const getComments=async(postId)=>{
    const COMMENTS=API+`comments/${postId}`;
    console.log('COMMENTS',COMMENTS);
    try{
        const response=await fetch(COMMENTS);       
        const data=await response.json();
        console.log('comments data',data);
        return data;
    }catch(error){
        return error;
    }
}
export const getSuggections=async()=>{
    const suggestions=API+`users/${userId}/suggestions`;
    console.log('SUGGESTIONS',suggestions);
    try{
        const response=await fetch(suggestions);       
        const data=await response.json();
        console.log('suggestions data',data);
        return data;
    }catch(error){
        return error;
    }
}

export const getFollowers=async(userId)=>{
    const FOLLOWERS=API+`follows/followers/${userId}`;
    console.log('FOLLOWERS',FOLLOWERS);
    try{
        const response=await fetch(FOLLOWERS);
        const data=await response.json();
        console.log('followers data',data);
        return data;
    }catch(error){
        return error;
    }
}
export const getFollowing=async(userId)=>{
    const FOLLOWING=API+`follows/following/${userId}`;
    console.log('FOLLOWING',FOLLOWING);
    try{
        const response=await fetch(FOLLOWING);
        const data=await response.json();
        console.log('following data',data);
        return data;
    }catch(error){
       return error;
    }
}
export const getIsFollower=async(userId1)=>{
    const IS_FOLLOWER=API+`follows?user1=${userId1}&user2=${userId}`;
    console.log('IS_FOLLOWER',IS_FOLLOWER);
    try{
        const response=await fetch(IS_FOLLOWER);
        const data=await response.json();
        console.log('is follower data',data);
        return data;
    }catch(error){
        return error;
    }
}
export const getLikes=async(postId)=>{
    const LIKES=API+`likes/${postId}`;
    console.log('LIKES',LIKES);
    try{
        const response=await fetch(LIKES);
        const data=await response.json();
        console.log('likes data',data);
        return data;
    }catch(error){
        return error;
    }
}
export const getNotifications=async()=>{
    const NOTIFICATIONS=API+`notifications/${userId}`;
    console.log('NOTIFICATIONS',NOTIFICATIONS);
    try{
        const response=await fetch(NOTIFICATIONS);
        const data=await response.json();
        console.log('notifications data',data);
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
        console.log('posts data',data);
        return data;
    }catch(error){
        return error;
    }
}
export const getPostsOfUser=async(userId,postId)=>{
    const POSTS_OF_USER=API+`posts/${userId}/${postId}`;
    console.log('POSTS_OF_USER',POSTS_OF_USER);
    try{
        const response=await fetch(POSTS_OF_USER);
        const data=await response.json();
        console.log('posts of user data',data);
        return data;
    }catch(error){
        return error;
    }
}
export const getFeeds=async(page)=>{
    const FEEDS=API+`posts/feeds/${userId}?page=${page}`;
    console.log('FEEDS',FEEDS);
    try{
        const response=await fetch(FEEDS);
        const data=await response.json();
        console.log('feeds data',data);
        // pageFeeds=page+1;
        return data;
    }catch(error){
        return error;
    }
}    
export const getReels = async (page) => {
    const REELS=API+`posts/reels/${userId}?page=${page}`;
    console.log('REELS',REELS);
    try{
        const response=await fetch(REELS);
        const data=await response.json();
        console.log('reels data',data);
        return data;
    }catch(error){
        return error;
    }
}

export const getSaves=async()=>{
    const SAVES=API+`saves/${userId}`;
    console.log('SAVES',SAVES);
    try{
        const response=await fetch(SAVES);
        const data=await response.json();
        console.log('saves data',data);
        return data;
    }catch(error){
        return error;
    }
}
export const getTags=async(userId)=>{
    const TAGS=API+`tags/${userId}`;
    console.log('TAGS',TAGS);
    try{
        const response=await fetch(TAGS);
        const data=await response.json();
        console.log('tags data',data);
        return data;
    }catch(error){
        return error;
    }
}
export const getSearch=async(query)=>{
    const SEARCH=API+`search/${query}?loggedInUserId=${userId}`;
    console.log('SEARCH',SEARCH);
    try{
        const response=await fetch(SEARCH);
        const data=await response.json();
        console.log('search data',data);
        return data;
    }catch(error){  
        return error;
    }
}
export const getStories=async()=>{
    const STORIES=API+`stories/${userId}`;
    console.log('STORIES',STORIES);
    try{
        const response=await fetch(STORIES);    
        const data=await response.json();
        console.log('stories data',data);
        return data;
    }catch(error){
        return error;
    }
};

export async function postApi(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add auth headers here if needed
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

export async function deleteApi(url, body) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // Add auth headers here if needed
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    // No content
  }
  return data;
}