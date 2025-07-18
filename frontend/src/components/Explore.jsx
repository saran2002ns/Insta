import React, { useState } from 'react';
import { FaPlayCircle } from "react-icons/fa";
import PostInfo from './PostInfo';
import { exploreItems } from '../db/DB';


function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function Explore() {
  const [showPostInfo, setShowPostInfo] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const postChunks = chunkArray(exploreItems, 5);

  const renderPost = (item) => (
    <div
      className="relative overflow-hidden h-full w-full group cursor-pointer"
      onClick={() => {
        setSelectedPost(item);
        setShowPostInfo(true);
      }}
    >
      {item.type === "video" ? (
        <>
          <video
            src={item.src}
           
            className="w-full h-full object-cover"
            playsInline
            // poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
          />
          <FaPlayCircle className="absolute top-2 right-2 text-white text-2xl drop-shadow" />
        </>
      ) : (
        <img
          src={item.src}
          alt={`Explore ${item.id}`}
          className="w-full h-full object-cover"
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex space-x-4 text-white text-lg font-semibold">
          <span className="flex items-center">
            <i className="fa-solid fa-heart mr-2"></i>
            {item.likeCount || 100}
          </span>
          <span className="flex items-center">
            <i className="fa-solid fa-comment mr-2"></i>
            {item.commentCount || 10}
          </span>
        </div>
      </div>
    </div>
  );

  return (<>
    {showPostInfo && selectedPost && (
      <PostInfo
        post={selectedPost}
        imageUrls={[selectedPost.src]}
        onClose={() => setShowPostInfo(false)}
      />
    )}
    <div className="p-4">
      {postChunks.map((chunk, idx) => (
        <div
          key={idx}
          className="mb-2 grid grid-cols-3 grid-rows-2 gap-2"
          style={{ minHeight: 600 }}
        >
          {idx % 2 === 0 ? (
            // Even: tall post on right
            <>
              {chunk[0] && <div className="row-start-1 col-start-1 h-full">{renderPost(chunk[0])}</div>}
              {chunk[1] && <div className="row-start-1 col-start-2 h-full">{renderPost(chunk[1])}</div>}
              {chunk[2] && <div className="row-start-2 col-start-1 h-full">{renderPost(chunk[2])}</div>}
              {chunk[3] && <div className="row-start-2 col-start-2 h-full">{renderPost(chunk[3])}</div>}
              {chunk[4] && (
                <div className="row-start-1 row-span-2 col-start-3 h-full">
                  {renderPost(chunk[4])}
                </div>
              )}
            </>
          ) : (
            // Odd: tall post on left
            <>
              {chunk[4] && (
                <div className="row-start-1 row-span-2 col-start-1 h-full">
                  {renderPost(chunk[4])}
                </div>
              )}
              {chunk[0] && <div className="row-start-1 col-start-2 h-full">{renderPost(chunk[0])}</div>}
              {chunk[1] && <div className="row-start-1 col-start-3 h-full">{renderPost(chunk[1])}</div>}
              {chunk[2] && <div className="row-start-2 col-start-2 h-full">{renderPost(chunk[2])}</div>}
              {chunk[3] && <div className="row-start-2 col-start-3 h-full">{renderPost(chunk[3])}</div>}
            </>
          )}
        </div>
      ))}
    </div>
  </>);
}
