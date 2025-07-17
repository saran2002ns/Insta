import React, { useRef, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

function Create() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingPost, setPendingPost] = useState(false);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setSelectedVideo(null);
      setShowCropper(true);
      setCroppedImage(null);
    }
  };

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedVideo(URL.createObjectURL(e.target.files[0]));
      setSelectedImage(null);
      setCroppedImage(null);
      setShowCropper(false);
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    setShowConfirm(true);
    setPendingPost(true);
  };

  const handleConfirmPost = () => {
    alert(`Post created!\nCaption: ${caption}\nTags: ${tags}\nLocation: ${location}`);
    setSelectedImage(null);
    setSelectedVideo(null);
    setCroppedImage(null);
    setCaption("");
    setTags("");
    setLocation("");
    setShowCropper(false);
    setShowConfirm(false);
    setPendingPost(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setPendingPost(false);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedVideo(null);
    setCroppedImage(null);
    setCaption("");
    setTags("");
    setLocation("");
    setShowCropper(false);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Helper to get cropped image
  const getCroppedImg = async (imageSrc, cropPixels) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = cropPixels.width;
    canvas.height = cropPixels.height;
    ctx.drawImage(
      image,
      cropPixels.x,
      cropPixels.y,
      cropPixels.width,
      cropPixels.height,
      0,
      0,
      cropPixels.width,
      cropPixels.height
    );
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });
  }

  const handleCropSave = async () => {
    if (selectedImage && croppedAreaPixels) {
      const croppedImgUrl = await getCroppedImg(selectedImage, croppedAreaPixels);
      setCroppedImage(croppedImgUrl);
      setShowCropper(false);
    }
  };

  // Add a handler to re-crop
  const handleRecrop = () => {
    setShowCropper(true);
    // If already cropped, use the cropped image as the source for cropping
    if (croppedImage) {
      setSelectedImage(croppedImage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-2">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">Create a New Post</h1>
        <p className="text-gray-500 text-center mb-6">Share your moments with your friends!</p>
        <div className="flex justify-center gap-4 mb-6">
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition-colors duration-200"
            onClick={handleImageClick}
          >
            Upload Image
          </button>
          <button
            className="px-5 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition-colors duration-200"
            onClick={handleVideoClick}
          >
            Upload Reel
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <input
          type="file"
          accept="video/*"
          ref={videoInputRef}
          style={{ display: 'none' }}
          onChange={handleVideoChange}
        />
        <div className="border-t border-gray-200 my-6"></div>
        <div className="mt-4">
          {!croppedImage && !selectedVideo && (
            <div className="flex flex-col items-center justify-center text-gray-400 py-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V8.25A2.25 2.25 0 015.25 6h13.5A2.25 2.25 0 0121 8.25v8.25M3 16.5A2.25 2.25 0 005.25 18.75h13.5A2.25 2.25 0 0021 16.5M3 16.5v-1.125c0-.621.504-1.125 1.125-1.125h15.75c.621 0 1.125.504 1.125 1.125V16.5" />
              </svg>
              <span className="text-lg">No file selected</span>
            </div>
          )}
        </div>
      </div>
      {/* Cropper Overlay */}
      {selectedImage && showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white w-[90vw] h-[90vh] flex flex-col items-center justify-center rounded-2xl shadow-2xl relative">
            <div className="w-full h-full relative flex-1 flex items-center justify-center">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex gap-4 items-center justify-center mt-4 mb-6">
              <label className="flex items-center gap-2">
                Zoom
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={e => setZoom(Number(e.target.value))}
                />
              </label>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                onClick={handleCropSave}
                type="button"
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200"
                onClick={handleCloseModal}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Post Creation Overlay (after crop or for video) */}
      {(croppedImage || selectedVideo) && !showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white w-[90%] h-[90%] flex rounded-lg overflow-hidden shadow-lg relative">
            {/* Left: Image/Video Preview */}
            <div className="flex-1 bg-black flex items-center justify-center relative">
              {croppedImage && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <img src={croppedImage} alt="Preview" className="w-full h-full object-contain bg-black" />
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-colors duration-200"
                      onClick={handleImageClick}
                    >
                      Change Image
                    </button>
                    <button
                      className="px-3 py-1.5 bg-yellow-500 text-white rounded-full font-semibold shadow hover:bg-yellow-600 transition-colors duration-200"
                      onClick={handleRecrop}
                    >
                      Crop
                    </button>
                  </div>
                </div>
              )}
              {selectedVideo && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <video src={selectedVideo} controls className="w-full h-full object-contain bg-black" />
                  <button
                    className="absolute top-4 right-4 px-3 py-1.5 bg-green-600 text-white rounded-full font-semibold shadow hover:bg-green-700 transition-colors duration-200 z-10"
                    onClick={handleVideoClick}
                  >
                    Change Video
                  </button>
                </div>
              )}
            </div>
            {/* Right: Post Details Form */}
            <div className="w-[400px] flex flex-col border-l border-gray-200 bg-white">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <img
                    src="https://via.placeholder.com/32"
                    className="w-8 h-8 rounded-full"
                    alt="user"
                  />
                  <span className="font-semibold">Your Username</span>
                </div>
                <button onClick={handleCloseModal} aria-label="Close">
                  <span className="text-2xl text-gray-400 hover:text-gray-700 font-bold">&times;</span>
                </button>
              </div>
              {/* Form */}
              <form onSubmit={handlePost} className="flex flex-col gap-3 p-4 flex-1">
                <label className="font-medium text-gray-700">Caption</label>
                <textarea
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[80px]"
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                />
                <label className="font-medium text-gray-700 mt-2">Tags</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="Add tags (comma separated)"
                />
                <label className="font-medium text-gray-700 mt-2">Location</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Add location"
                />
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 self-end"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
          {/* Confirmation Overlay */}
          {showConfirm && pendingPost && (
            <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">Are you sure you want to post?</h2>
                <div className="flex gap-4">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    onClick={handleConfirmPost}
                  >
                    Confirm
                  </button>
                  <button
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200"
                    onClick={handleCloseConfirm}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Create; 