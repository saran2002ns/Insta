import React from 'react'
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PostInfo({ imageUrls, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageUrls.length - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % imageUrls.length);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
      {/* Overlay Box */}
      <div className="bg-white w-[90%] h-[90%] flex rounded-lg overflow-hidden shadow-lg relative">
        {/* Left: Image Viewer */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <img src={imageUrls[currentIndex]} alt="post" className="max-h-full max-w-full" />
          <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
            <ChevronLeft />
          </button>
          <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
            <ChevronRight />
          </button>
        </div>

        {/* Right: Post Details */}
        <div className="w-[400px] flex flex-col border-l border-gray-200 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <img
                src="https://via.placeholder.com/32"
                className="w-8 h-8 rounded-full"
                alt="user"
              />
              <span className="font-semibold">mr__kuttan_-_</span>
            </div>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <p><span className="font-semibold">mr__kuttan_-_</span> 🧑🏽‍🤝‍🧑 💞</p>
            <p><span className="font-semibold">_mr.naasif_</span> 🙌🤯💝</p>
            <p><span className="font-semibold">sushmi_ns</span> 🤗❣️</p>
            <p><span className="font-semibold">manoj_nv</span> 😍😍❤️</p>
          </div>
          <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center pl-2 gap-4">
           
                    <button className="hover:scale-110 transition-transform" aria-label="Like"><i className="fa-regular fa-heart text-2xl"></i></button>
                    <button className="hover:scale-110 transition-transform" aria-label="Comment"><i className="fa-regular fa-comment text-2xl"></i></button>
                    <button className="hover:scale-110 transition-transform" aria-label="Share"><i className="fa-regular fa-paper-plane text-2xl"></i></button>
                  </div>
                  <button className="hover:scale-110 transition-transform pr-2" aria-label="Save"><i className="fa-regular fa-bookmark text-2xl"></i></button>
                </div>

          {/* Likes & Time */}
          <div className="px-4 text-sm text-gray-600">Liked by _luckyy_lad and 114 others</div>
          <div className="px-4 text-xs text-gray-400 mb-2">October 28, 2023</div>

          {/* Comment Input */}
          <div className="p-4 border-t flex items-center gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm"
            />
            <button className="text-blue-500 font-semibold text-sm">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
