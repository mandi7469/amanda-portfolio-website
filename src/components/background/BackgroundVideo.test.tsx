import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, vi } from "vitest";
import { BackgroundVideo } from "./BackgroundVideo";

describe("BackgroundVideo", () => {
  let play: ReturnType<typeof vi.spyOn>;
  let viewportWidth: number;
  let mediaQueries: Map<string, MediaQueryList>;

  function resizeViewport(width: number) {
    act(() => {
      viewportWidth = width;
      mediaQueries.forEach((query) => query.dispatchEvent(new Event("change")));
    });
  }

  beforeEach(() => {
    play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    viewportWidth = 1440;
    mediaQueries = new Map();
    vi.spyOn(window, "matchMedia").mockImplementation((media) => {
      if (!mediaQueries.has(media)) {
        const query = Object.assign(new EventTarget(), { media });
        // Keep matches live as the simulated viewport changes.
        Object.defineProperty(query, "matches", {
          get: () => viewportWidth <= Number(media.match(/\d+/)?.[0]),
        });
        mediaQueries.set(media, query as MediaQueryList);
      }
      return mediaQueries.get(media)!;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("uses one explicit silent video URL and a static poster", () => {
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video");

    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveProperty("muted", true);
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("poster", "/media/smoke-poster.webp");
    expect(video).toHaveAttribute("src", "/media/smoke-desktop.mp4");
    expect(container.querySelectorAll("source")).toHaveLength(0);
  });

  it.each([
    [402, "mobile"], [640, "mobile"], [641, "tablet"],
    [834, "tablet"], [1100, "tablet"], [1101, "desktop"],
  ])("selects the %s px viewport's %s URL directly", (width, variant) => {
    viewportWidth = Number(width);
    const { container } = render(<BackgroundVideo />);
    expect(container.querySelector("video")).toHaveAttribute("src", `/media/smoke-${variant}.mp4`);
  });

  it("does not advertise a wrong-sized download before hydration", () => {
    const html = renderToString(<BackgroundVideo />);
    expect(html).toContain("/media/smoke-poster.webp");
    expect(html).not.toContain(".mp4");
  });

  it("changes source on rotation, but leaves playback alone within a breakpoint", () => {
    viewportWidth = 402;
    const { container } = render(<BackgroundVideo />);
    const portraitVideo = container.querySelector("video");
    resizeViewport(430);
    expect(container.querySelector("video")).toBe(portraitVideo);
    fireEvent.error(portraitVideo!);

    resizeViewport(750);
    const landscapeVideo = container.querySelector("video");
    expect(landscapeVideo).not.toBe(portraitVideo);
    expect(landscapeVideo).toHaveAttribute("src", "/media/smoke-tablet.mp4");
    expect(landscapeVideo).not.toHaveAttribute("data-playback-failed");

    resizeViewport(1194);
    expect(container.querySelector("video")).toHaveAttribute("src", "/media/smoke-desktop.mp4");
    resizeViewport(402);
    expect(container.querySelector("video")).toHaveAttribute("src", "/media/smoke-mobile.mp4");
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

  it("keeps the video visible when playback loops during a transient stall", () => {
    vi.useFakeTimers();
    const { container } = render(<BackgroundVideo />);
    const video = container.querySelector("video")!;
    video.currentTime = 9.8;

    fireEvent.stalled(video);
    video.currentTime = 0.4;
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
