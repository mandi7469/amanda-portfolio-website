export function BackgroundVideo() {
  return (
    <div className="motion-background" aria-hidden="true">
      <video
        autoPlay
        muted
        loop
        playsInline
        tabIndex={-1}
        poster="/media/smoke-poster.webp"
        preload="metadata"
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
      <div className="background-scrim" />
    </div>
  );
}
