"use client";

import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface ReactPlayerWrapperProps {
  url: string;
  title?: string;
  description?: string;
  className?: string;
  light?: boolean | string;
  controls?: boolean;
  playing?: boolean;
  loop?: boolean;
  volume?: number;
  muted?: boolean;
  playbackRate?: number;
  width?: string | number;
  height?: string | number;
  fallbackImage?: string;
  onEnded?: () => void;
}

export default function ReactPlayerWrapper({
  url,
  title,
  description,
  className,
  light = true,
  controls = true,
  playing = false,
  loop = false,
  volume = 0.8,
  muted = false,
  playbackRate = 1.0,
  width = "100%",
  height = "100%",
  fallbackImage,
  onEnded,
}: ReactPlayerWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(playing);
  const [hasStarted, setHasStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | boolean>(light);
  const playerRef = useRef<ReactPlayer>(null);

  // Handle YouTube thumbnail loading if light=true and no custom thumbnail is provided
  useEffect(() => {
    setIsClient(true);

    if (light === true && url.includes("youtube.com") && !fallbackImage) {
      // Extract video ID from YouTube URL
      const videoIdMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*)/,
      );
      if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];

        // Try to load the highest quality thumbnail first
        const img = new Image();
        img.onload = () => {
          setThumbnailUrl(
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          );
        };
        img.onerror = () => {
          // If maxres is not available, use high quality
          setThumbnailUrl(
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          );
        };
        img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } else if (typeof fallbackImage === "string") {
      setThumbnailUrl(fallbackImage);
    }
  }, [light, url, fallbackImage]);

  const handlePlay = () => {
    setIsPlaying(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnded) onEnded();
  };

  const handleReady = () => {
    setIsReady(true);
  };

  // Custom play button for the light mode
  const renderPlayIcon = () => (
    <button
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-300 cursor-pointer"
      aria-label="Play video"
      onClick={() => setIsPlaying(true)}
    >
      <div className="w-16 h-16 rounded-full bg-emerald-600 bg-opacity-90 flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg">
        <Play className="w-8 h-8 text-white fill-white" />
      </div>
    </button>
  );

  const handleThumbnailClick = () => {
    if (!hasStarted) {
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  return (
    <div className={cn("video-player-wrapper", className)}>
      {(title || description) && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-t-lg">
          {title && (
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className="relative aspect-video rounded-b-lg overflow-hidden bg-gray-100 dark:bg-gray-900"
        onClick={handleThumbnailClick}
      >
        {isClient ? (
          <ReactPlayer
            ref={playerRef}
            src={url}
            className="react-player"
            width={width}
            height={height}
            playing={isPlaying}
            controls={hasStarted && controls}
            light={!hasStarted ? thumbnailUrl : false}
            loop={loop}
            volume={volume}
            muted={muted}
            playbackRate={playbackRate}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onReady={handleReady}
            playIcon={renderPlayIcon()}
            config={{
              youtube: {
                rel: 0, // Prevents related videos from other channels
                iv_load_policy: 3, // Hides video annotations
                fs: 0, // Hides fullscreen button (optional)
                disablekb: 1, // Disables keyboard controls (optional)
              },
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-600 bg-opacity-70 flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        )}

        {!isReady && !hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-600 bg-opacity-70 flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
