import { expect, test } from "@playwright/test";

const sectionIds = ["home", "skills", "projects", "experience", "contact"];

test("renders the complete one-page portfolio without horizontal overflow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Amanda Changa" })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  for (const id of sectionIds) {
    await expect(page.locator(`#${id}.glass-section`)).toHaveCount(1);
  }

  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("keeps all interface colors neutral", async ({ page }) => {
  await page.goto("/");

  const nonNeutralColors = await page.locator("h1, h2, h3, p, a, button, li, strong, span").evaluateAll((nodes) => {
    const isNeutral = (value: string) => {
      const channels = value.match(/[\d.]+/g)?.map(Number) ?? [];
      if (channels.length < 3) return true;
      return Math.abs(channels[0] - channels[1]) < 1 && Math.abs(channels[1] - channels[2]) < 1;
    };

    return nodes
      .map((node) => ({ text: node.textContent?.trim().slice(0, 40), color: getComputedStyle(node).color }))
      .filter(({ color }) => !isNeutral(color));
  });

  expect(nonNeutralColors).toEqual([]);
});

test("mobile navigation closes with Escape and returns focus", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile interaction contract");
  await page.goto("/");

  const toggle = page.locator(".menu-toggle");
  await expect(toggle).toHaveAccessibleName("Open navigation menu");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "Home" }).last()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("reduced motion replaces the video with its static poster", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".motion-background video")).toHaveCSS("display", "none");
});
