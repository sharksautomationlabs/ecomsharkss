'use client';

import React, { useRef, useState } from 'react';

export default function VideoTest() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    setVideoError('Failed to load video');
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Video Test Component</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">bi-vid.mp4 Test:</h2>
        <video
          ref={videoRef}
          width="400"
          height="300"
          controls
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          className="border border-gray-300"
        >
          <source src="/images/bi-vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {videoError && <p className="text-red-500 mt-2">Error: {videoError}</p>}
        {videoLoaded && <p className="text-green-500 mt-2">Video loaded successfully!</p>}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">sharjeel.mp4 Test:</h2>
        <video
          width="400"
          height="300"
          controls
          className="border border-gray-300"
        >
          <source src="/images/sharjeel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">under-water-logos.mp4 Test:</h2>
        <video
          width="400"
          height="300"
          controls
          className="border border-gray-300"
        >
          <source src="/images/under-water-logos.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Debug Info:</h2>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Server side'}</p>
        <p>Video paths being tested:</p>
        <ul className="list-disc list-inside">
          <li>/images/bi-vid.mp4</li>
          <li>/images/sharjeel.mp4</li>
          <li>/images/under-water-logos.mp4</li>
        </ul>
      </div>
    </div>
  );
}
