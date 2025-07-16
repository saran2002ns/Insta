import React from 'react';

function Post({post, setShowOverlay }) {
    console.log(post);
  return (
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
  );
}

export default Post;
