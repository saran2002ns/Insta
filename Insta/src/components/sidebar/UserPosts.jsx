import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from './Post';

function UserPosts(props) {

  const imagePosts = (props.posts).filter((post) => post.mediaType === "image");
  const [showOverlay, setShowOverlay] = useState(false);
   const [post, setPost] = useState({});
   const set =(pos)=>{
    setShowOverlay(true);
      setPost(pos);
   }

  return (
    <div> 
        <div className="grid grid-cols-3 gap-1 p-1">
          {imagePosts.map((pos, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-300 bg-cover bg-center"
                style={{ backgroundImage: `url('${pos.mediaUrl}')` }}     
                onClick={() => set(pos)}
                ></div>
               ))}
          </div>
      {showOverlay && <Post post={post}   setShowOverlay={ setShowOverlay}/>
        
      }
    </div>
  )
}

export default UserPosts