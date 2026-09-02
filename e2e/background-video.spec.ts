import { expect, test } from "@playwright/test";

for (const [width, variant, resolution] of [
  [402, "mobile", [900, 1600]],
  [640, "mobile", [900, 1600]],
  [641, "tablet", [1280, 1706]],
  [834, "tablet", [1280, 1706]],
  [1100, "tablet", [1280, 1706]],
  [1101, "desktop", [2160, 1440]],
  [1194, "desktop", [2160, 1440]],
] as const) {
  test(`loads only the ${variant} background at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    const videoRequests = new Set<string>();
    page.on("request", (request) => {
      const path = new URL(request.url()).pathname;
      if (/\/media\/smoke-.*\.mp4$/.test(path)) videoRequests.add(path);
    });
    await page.goto("/");

    const expectedSource = `/media/smoke-${variant}.mp4`;
    const video = page.locator(".motion-background video");
    await expect(video).toHaveAttribute("src", expectedSource);
    await expect(video.locator("source")).toHaveCount(0);
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => ({
      source: element.currentSrc ? new URL(element.currentSrc).pathname : null,
      resolution: [element.videoWidth, element.videoHeight],
      paused: element.paused,
    }))).toEqual({ source: expectedSource, resolution: [...resolution], paused: false });
    await expect(video).toBeVisible();
    await expect(video).toHaveCSS("object-fit", "cover");
    expect([...videoRequests]).toEqual([expectedSource]);
  });
}

test("keeps playing after orientation changes without a refresh", async ({ page }) => {
  await page.setViewportSize({ width: 402, height: 754 });
  await page.goto("/");
  const video = page.locator(".motion-background video");
  for (const [width, height, variant] of [
    [402, 754, "mobile"], [750, 402, "tablet"],
    [1194, 748, "desktop"], [402, 754, "mobile"],
  ] as const) {
    await page.setViewportSize({ width, height });
    await expect(video).toHaveAttribute("src", `/media/smoke-${variant}.mp4`);
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) =>
      !element.paused && element.currentTime > 0.1 && element.videoWidth > 0,
    )).toBe(true);
    await expect(video).not.toHaveAttribute("data-playback-failed");
  }
});
