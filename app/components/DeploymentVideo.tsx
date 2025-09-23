'use client';

import React, { useRef, useState, useEffect } from 'react';

interface DeploymentVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  fallbackImage?: string;
}

export default function DeploymentVideo({
  src,
  className = '',
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  controls = false,
  preload = 'metadata',
  fallbackImage
}: DeploymentVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      console.error(`Video failed to load: ${src}`);
      setVideoError(true);
      setIsLoading(false);
      
      // Retry loading with different approach
      if (retryCount < maxRetries) {
        setTimeout(() => {
          console.log(`Retrying video load (attempt ${retryCount + 1}): ${src}`);
          setRetryCount(prev => prev + 1);
          setVideoError(false);
          setIsLoading(true);
          
          // Try loading with different attributes
          video.load();
        }, 1000 * (retryCount + 1));
      }
    };

    const handleLoadStart = () => {
      console.log(`Video loading started: ${src}`);
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      console.log(`Video can play: ${src}`);
      setIsLoading(false);
      setVideoError(false);
    };

    const handleLoadedData = () => {
      console.log(`Video data loaded: ${src}`);
      setIsLoading(false);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [src, retryCount]);

  // Try different video sources for deployment compatibility
  const getVideoSources = () => {
    const basePath = src.startsWith('/') ? src : `/${src}`;
    return [
      { src: basePath, type: 'video/mp4' },
      { src: basePath.replace('/images/', '/images/'), type: 'video/mp4' },
      { src: basePath.replace('/images/', './images/'), type: 'video/mp4' },
    ];
  };

  if (videoError && retryCount >= maxRetries) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-200`}>
        {fallbackImage ? (
          <img 
            src={fallbackImage} 
            alt="Video fallback" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-600 mb-2">Video unavailable</p>
            <p className="text-sm text-gray-500">{src}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading video...</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        preload={preload}
        key={`${src}-${retryCount}`} // Force re-render on retry
      >
        {getVideoSources().map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
