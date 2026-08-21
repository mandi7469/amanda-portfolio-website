import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { BackgroundVideo } from "./BackgroundVideo";

describe("BackgroundVideo", () => {
  let play: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

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

  it("observes the initial playback attempt when the video can play", async () => {
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video");
    const attemptsBeforeCanPlay = play.mock.calls.length;

    fireEvent.canPlay(video!);

    await waitFor(() => expect(play).toHaveBeenCalledTimes(attemptsBeforeCanPlay + 1));
  });

  it("retries playback when the page returns from browser history", async () => {
    const { container } = render(<BackgroundVideo />);
    play.mockClear();

    act(() => {
      window.dispatchEvent(new Event("pageshow"));
    });

    const video = container.querySelector("video");
    fireEvent.canPlay(video!);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
  });

  it("replaces a restored video element so a stale black frame cannot remain visible", async () => {
    const { container } = render(<BackgroundVideo />);
    const restoredVideo = container.querySelector("video");

    act(() => {
      window.dispatchEvent(new Event("pageshow"));
    });

    await waitFor(() => expect(container.querySelector("video")).not.toBe(restoredVideo));
    expect(container.querySelector("video")).toHaveAttribute("data-playback-failed", "true");
  });

  it("retries playback when a hidden page becomes visible", async () => {
    const visibilityState = vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    const { container } = render(<BackgroundVideo />);
    play.mockClear();

    fireEvent(document, new Event("visibilitychange"));
    expect(play).not.toHaveBeenCalled();

    visibilityState.mockReturnValue("visible");
    fireEvent(document, new Event("visibilitychange"));

    fireEvent.canPlay(container.querySelector("video")!);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
  });

  it("reveals the poster when playback is rejected", async () => {
    play.mockRejectedValue(new DOMException("Playback was blocked", "NotAllowedError"));
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video");
    fireEvent.canPlay(video!);

    await waitFor(() => expect(video).toHaveAttribute("data-playback-failed", "true"));
  });

  it("reveals the poster when the video emits an error", () => {
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video");

    fireEvent.error(video!);

    expect(video).toHaveAttribute("data-playback-failed", "true");
  });

  it("keeps the video visible when playback advances after a transient stall", () => {
    vi.useFakeTimers();
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video")!;
    video.currentTime = 4;

    fireEvent.stalled(video);
    expect(video).not.toHaveAttribute("data-playback-failed");

    video.currentTime = 5;
    act(() => vi.advanceTimersByTime(2_000));

    expect(video).not.toHaveAttribute("data-playback-failed");
  });

  it("reveals the poster when playback remains stalled", () => {
    vi.useFakeTimers();
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video")!;
    video.currentTime = 4;

    fireEvent.stalled(video);
    expect(video).not.toHaveAttribute("data-playback-failed");

    act(() => vi.advanceTimersByTime(2_000));

    expect(video).toHaveAttribute("data-playback-failed", "true");
  });

  it("restores the video after a later playback attempt succeeds", async () => {
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video");

    fireEvent.error(video!);
    expect(video).toHaveAttribute("data-playback-failed", "true");

    act(() => {
      window.dispatchEvent(new Event("pageshow"));
    });

    const restartedVideo = container.querySelector("video");
    fireEvent.canPlay(restartedVideo!);
    await waitFor(() => expect(restartedVideo).not.toHaveAttribute("data-playback-failed"));
  });
});
