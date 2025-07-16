import React, { useState } from 'react'

function UserReels(props) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-center mb-8">Main Page</h1>
      <div className="flex justify-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          onClick={() => setShowOverlay(true)}
        >
          Open Overlay
        </button>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Overlay Page</h2>
            <p className="mb-6 text-gray-700">
              You can still see the page behind this overlay.
            </p>
            <button
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={() => setShowOverlay(false)}
            >
              Close Overlay
            </button>
          </div>
        </div>
      )}
    </div>
  );
  // const imagePosts = (props.posts).filter((post) => post.mediaType === "video");

  // return (
  //   <div> 
  //       <div className="grid grid-cols-3 gap-1 p-1">
  //         {imagePosts.map((post, i) => (
  //             <div
  //               key={i}
  //               className="aspect-square bg-gray-300 bg-cover bg-center"
  //               style={{ backgroundImage: `url('${post.mediaUrl}')` }}
  //               ></div>
  //              ))}
  //         </div>
  //   </div>
  // )
}

export default UserReels