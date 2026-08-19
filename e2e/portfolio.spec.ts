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

test("keeps the project grid responsive and each card vertically composed", async ({ page }) => {
  await page.goto("/");

  const projectsSection = page.locator("#projects");
  const cards = page.locator(".featured-projects .project-card-featured");
  await expect(projectsSection).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(projectsSection).toHaveCSS("backdrop-filter", "none");
  await expect(projectsSection).toHaveCSS("border-top-style", "none");
  await expect(cards).toHaveCount(3);
  await expect(cards.locator("h3")).toHaveText([
    "Recipe Vault",
    "Fairway Favorites",
    "Cosmic Quest",
  ]);
  await expect(cards.locator(".project-role")).toHaveText([
    "Independent",
    "Independent",
    "Collaborative",
  ]);

  const [firstCard, secondCard] = await Promise.all([
    cards.nth(0).boundingBox(),
    cards.nth(1).boundingBox(),
  ]);

  expect(firstCard).not.toBeNull();
  expect(secondCard).not.toBeNull();

  if (page.viewportSize()!.width > 820) {
    expect(Math.abs(secondCard!.y - firstCard!.y)).toBeLessThanOrEqual(1);
    expect(secondCard!.x).toBeGreaterThanOrEqual(firstCard!.x + firstCard!.width - 1);
  } else {
    expect(secondCard!.y).toBeGreaterThanOrEqual(firstCard!.y + firstCard!.height - 1);
  }

  for (const card of await cards.all()) {
    await card.scrollIntoViewIfNeeded();
    const image = card.locator("img");
    const mediaContainer = card.locator(".project-media");
    const [media, copy] = await Promise.all([
      mediaContainer.boundingBox(),
      card.locator(".project-copy").boundingBox(),
    ]);

    expect(media).not.toBeNull();
    expect(copy).not.toBeNull();
    expect(copy!.y).toBeGreaterThanOrEqual(media!.y + media!.height - 1);
    await expect
      .poll(() =>
        image.evaluate((element) => {
          const projectImage = element as HTMLImageElement;
          return projectImage.complete && projectImage.naturalWidth > 0;
        }),
        { timeout: 15_000 },
      )
      .toBe(true);
    await expect(mediaContainer).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(mediaContainer).toHaveCSS("border-top-style", "none");
    await expect(card).toHaveCSS("position", "relative");
    await expect(card).toHaveCSS("isolation", "isolate");
    await expect(card).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(card).toHaveCSS("backdrop-filter", /blur/);
    await expect(image).toHaveCSS("filter", "none");
    await card.hover();
    await expect(image).toHaveCSS("filter", "none");
  }
});

test("matches the Projects and Experience headings to the Technical Skills typography", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#experience h2")).toHaveText("Professional Experience");
  const headingStyles = await page.locator("#skills h2, #projects h2, #experience h2").evaluateAll((headings) =>
    headings.map((heading) => {
      const style = getComputedStyle(heading);
      return {
        color: style.color,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
      };
    }),
  );

  expect(headingStyles).toHaveLength(3);
  expect(headingStyles[1]).toEqual(headingStyles[0]);
  expect(headingStyles[2]).toEqual(headingStyles[0]);
});

test("keeps project card backdrop blur outside transformed ancestors", async ({ page }) => {
  await page.goto("/");

  const projectsSection = page.locator("#projects");
  await projectsSection.scrollIntoViewIfNeeded();

  await expect(projectsSection).toHaveCSS("animation-name", "none");
  await expect(projectsSection).toHaveCSS("transform", "none");
  await expect(projectsSection.locator(".project-card").first()).toHaveCSS("backdrop-filter", /blur/);
});

test("keeps experience row blur outside transformed ancestors", async ({ page }) => {
  await page.goto("/");

  const experienceSection = page.locator("#experience");
  const rows = experienceSection.locator(".experience-row");
  await experienceSection.scrollIntoViewIfNeeded();

  await expect(rows).toHaveCount(2);
  await expect(experienceSection).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(experienceSection).toHaveCSS("backdrop-filter", "none");
  await expect(experienceSection).toHaveCSS("animation-name", "none");
  await expect(experienceSection).toHaveCSS("transform", "none");

  for (const row of await rows.all()) {
    await expect(row).toHaveCSS("position", "relative");
    await expect(row).toHaveCSS("isolation", "isolate");
    await expect(row).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(row).toHaveCSS("backdrop-filter", /blur/);
  }
});

test("gives freelance cards depth without filtering their source images", async ({ page }) => {
  await page.goto("/");

  const freelanceProjectCards = page.locator("#experience .project-card-supporting");
  await expect(freelanceProjectCards).toHaveCount(4);
  for (const card of await freelanceProjectCards.all()) {
    await expect(card).toHaveCSS("background-color", "rgba(255, 255, 255, 0.035)");
    await expect(card).toHaveCSS("background-image", /linear-gradient/);
    await expect(card).toHaveCSS("backdrop-filter", "none");
    await expect(card).not.toHaveCSS("box-shadow", "none");

    const image = card.locator("img");
    await expect(image).toHaveCSS("filter", "none");
    await expect(image).toHaveCSS("opacity", "1");
  }
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
