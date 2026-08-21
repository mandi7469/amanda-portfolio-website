import { render } from "@testing-library/react";
import { BackgroundVideo } from "./BackgroundVideo";

describe("BackgroundVideo", () => {
  it("uses silent responsive sources and a static poster", () => {
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video");
    const sources = Array.from(container.querySelectorAll("source"));

    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveProperty("muted", true);
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("poster", "/media/smoke-poster.webp");
    expect(sources.map((source) => source.getAttribute("src"))).toEqual([
      "/media/smoke-mobile.mp4",
      "/media/smoke-tablet.mp4",
      "/media/smoke-desktop.mp4",
    ]);
  });

  it("sets a calmer playback speed when the video mounts", () => {
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video");

    expect(video).not.toBeNull();
    expect(video).toHaveProperty("playbackRate", 0.8);
  });
});
