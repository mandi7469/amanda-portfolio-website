"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BACKGROUND_VIDEO_PLAYBACK_RATE = 0.8;
const STALLED_PLAYBACK_GRACE_MS = 1_500;

function setPlaybackRate(video: HTMLVideoElement | null) {
  if (video) video.playbackRate = BACKGROUND_VIDEO_PLAYBACK_RATE;
}

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackAttemptRef = useRef(0);
  const stalledPlaybackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const [videoGeneration, setVideoGeneration] = useState(0);

  const clearStalledPlaybackCheck = useCallback(() => {
    if (stalledPlaybackTimerRef.current === null) return;
    clearTimeout(stalledPlaybackTimerRef.current);
    stalledPlaybackTimerRef.current = null;
  }, []);

  const captureVideo = useCallback((video: HTMLVideoElement | null) => {
    videoRef.current = video;
    setPlaybackRate(video);
  }, []);

  const attemptPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const attempt = ++playbackAttemptRef.current;

    try {
      const playback = video.play();
      if (!playback) {
        setPlaybackFailed(false);
        return;
      }

      void playback.then(
        () => {
          if (playbackAttemptRef.current === attempt) setPlaybackFailed(false);
        },
        () => {
          if (playbackAttemptRef.current === attempt) setPlaybackFailed(true);
        },
      );
    } catch {
      if (playbackAttemptRef.current === attempt) setPlaybackFailed(true);
    }
  }, []);

  const markPlaybackFailed = useCallback(() => {
    clearStalledPlaybackCheck();
    playbackAttemptRef.current += 1;
    setPlaybackFailed(true);
  }, [clearStalledPlaybackCheck]);

  const markPlaybackAvailable = useCallback(() => {
    clearStalledPlaybackCheck();
    playbackAttemptRef.current += 1;
    setPlaybackFailed(false);
  }, [clearStalledPlaybackCheck]);

  const checkStalledPlayback = useCallback(() => {
    clearStalledPlaybackCheck();
    const stalledVideo = videoRef.current;
    if (!stalledVideo) return;

    const stalledAt = stalledVideo.currentTime;
    stalledPlaybackTimerRef.current = setTimeout(() => {
      stalledPlaybackTimerRef.current = null;
      const playbackProgressed = Math.abs(stalledVideo.currentTime - stalledAt) > 0.01;
      if (videoRef.current !== stalledVideo || playbackProgressed) return;

      playbackAttemptRef.current += 1;
      setPlaybackFailed(true);
    }, STALLED_PLAYBACK_GRACE_MS);
  }, [clearStalledPlaybackCheck]);

  const restartVideo = useCallback(() => {
    clearStalledPlaybackCheck();
    playbackAttemptRef.current += 1;
    setPlaybackFailed(true);
    setVideoGeneration((generation) => generation + 1);
  }, [clearStalledPlaybackCheck]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") restartVideo();
    };

    window.addEventListener("pageshow", restartVideo);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearStalledPlaybackCheck();
      playbackAttemptRef.current += 1;
      window.removeEventListener("pageshow", restartVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [clearStalledPlaybackCheck, restartVideo]);

  return (
    <div className="motion-background" aria-hidden="true">
      <video
        key={videoGeneration}
        ref={captureVideo}
        autoPlay
        muted
        loop
        playsInline
        tabIndex={-1}
        data-playback-failed={playbackFailed || undefined}
        poster="/media/smoke-poster.webp"
        preload="metadata"
        onCanPlay={attemptPlayback}
        onError={markPlaybackFailed}
        onStalled={checkStalledPlayback}
        onPlaying={markPlaybackAvailable}
        onLoadedMetadata={(event) => {
          setPlaybackRate(event.currentTarget);
        }}
      >
        <source
          src="/media/smoke-mobile.mp4"
          type="video/mp4"
          media="(max-width: 640px)"
        />
        <source
          src="/media/smoke-tablet.mp4"
          type="video/mp4"
          media="(max-width: 1100px)"
        />
        <source src="/media/smoke-desktop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
