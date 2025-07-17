import React, { useState } from 'react';
import { FaPlayCircle } from "react-icons/fa";
import PostInfo from './PostInfo';

const exploreItems = [
  {
    id: 1,
    src: "https://pixeldrain.com/api/file/BF9gAoBf",
    type: "video",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600",
    type: "image",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600",
    type: "image",
  },
  {
    id: 4,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "video",
  },
  {
    id: 5,
    src: "https://www.w3schools.com/html/movie.mp4",
    type: "video",
  },
  // Add more posts if you want to see multiple sets
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
    type: "image",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600",
    type: "image",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600",
    type: "image",
  },
  {
    id: 9,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "video",
  },
  {
    id: 10,
    src: "https://www.w3schools.com/html/movie.mp4",
    type: "video",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
    type: "image",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600",
    type: "image",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600",
    type: "image",
  },
  {
    id: 14,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "video",
  },
  {
    id: 15,
    src: "https://www.w3schools.com/html/movie.mp4",
    type: "video",
  },
  // Add more posts if you want to see multiple sets
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
    type: "image",
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600",
    type: "image",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600",
    type: "image",
  },
  {
    id: 19,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "video",
  },
  {
    id: 20,
    src: "https://www.w3schools.com/html/movie.mp4",
    type: "video",
  },
  {
    id: 21,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
    type: "image",
  },
  {
    id: 22,
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600",
    type: "image",
  },
  {
    id: 23,
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600",
    type: "image",
  },
  {
    id: 24,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "video",
  },
  {
    id: 25,
    src: "https://www.w3schools.com/html/movie.mp4",
    type: "video",
  },
  // Add more posts if you want to see multiple sets
  {
    id: 26,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
    type: "image",
  },
  {
    id: 27,
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600",
    type: "image",
  },
  {
    id: 28,
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600",
    type: "image",
  },
  {
    id: 29,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "video",
  },
  {
    id: 30,
    src: "https://www.w3schools.com/html/movie.mp4",
    type: "video",
  },
];

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
            controls
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
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
