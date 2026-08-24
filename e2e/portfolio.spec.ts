import { expect, test } from "@playwright/test";

const sectionIds = ["home", "skills", "projects", "experience", "contact"];

test("renders the complete one-page portfolio without horizontal overflow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Amanda Changa" })).toBeVisible();

  for (const id of sectionIds) {
    await expect(page.locator(`#${id}.glass-section`)).toHaveCount(1);
  }

  await expect(page.locator("main > :last-child")).toHaveAttribute("id", "contact");

  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("renders the copyright footer directly without an outer wrapper", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".footer-shell")).toHaveCount(0);
  const footer = page.locator("body > .site-footer");
  await expect(footer).toHaveCount(1);
  await expect(footer.getByText(/Developed and Designed by Amanda Changa/)).toBeVisible();
  await expect(footer).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(footer).toHaveCSS("backdrop-filter", "none");

  for (const width of [320, 390, 768, 1208, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator("main > :last-child")).toHaveAttribute("id", "contact");
    await expect(footer.locator(".footer-brand")).toBeVisible();
    await expect(footer.locator(".footer-brand")).toHaveAttribute("href", "#home");

    const [mainBox, footerBox] = await Promise.all([
      page.locator("main").boundingBox(),
      footer.boundingBox(),
    ]);
    expect(mainBox).not.toBeNull();
    expect(footerBox).not.toBeNull();
    expect(Math.abs(
      footerBox!.x + footerBox!.width / 2 - (mainBox!.x + mainBox!.width / 2),
    )).toBeLessThanOrEqual(1);
    expect(Math.abs(footerBox!.width - mainBox!.width)).toBeLessThanOrEqual(8);
  }
});

test("keeps the contact section transparent and its action buttons frosted", async ({ page }) => {
  await page.goto("/");

  const contact = page.locator("#contact");
  await expect(contact).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(contact).toHaveCSS("background-image", "none");
  await expect(contact).toHaveCSS("backdrop-filter", "none");
  await expect(contact).toHaveCSS("isolation", "auto");
  await expect(contact).toHaveCSS("animation-name", "none");
  await expect(contact).toHaveCSS("border-top-style", "none");
  await expect(contact).toHaveCSS("box-shadow", "none");
  expect(await contact.evaluate((element) => getComputedStyle(element, "::before").content)).toBe("none");

  const actions = contact.locator(".contact-actions a");
  await expect(actions).toHaveCount(4);
  for (const surface of await contact.locator(".contact-action-surface").all()) {
    await expect(surface).toHaveCSS("backdrop-filter", /blur/);
    await expect(surface).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(surface).not.toHaveCSS("border-top-style", "none");
  }

  const backToTop = contact.locator(".contact-back-to-top");
  await expect(backToTop).toHaveCSS("backdrop-filter", /blur\(18px\)/);
  await expect(backToTop.locator("svg")).toHaveCSS("stroke-width", "2.5px");

  const firstAction = actions.first();
  const firstSurface = firstAction.locator(".contact-action-surface");
  await firstAction.hover();
  await expect(firstAction).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -2)");
  await expect(firstSurface).toHaveCSS("transform", "none");
  await expect(firstSurface).toHaveCSS("border-color", "rgba(255, 255, 255, 0.74)");
  await expect(firstSurface).toHaveCSS("background-color", "rgba(255, 255, 255, 0.094)");
});

test("wraps mobile skill squircles after every fourth item", async ({ page }) => {
  await page.goto("/");

  const frontendSkills = page.locator("#skills .skill-group").filter({ hasText: "Frontend" });
  const surfaces = frontendSkills.locator(".skill-bubble-surface");

  for (const width of [320, 390, 620, 767]) {
    await page.setViewportSize({ width, height: 900 });

    const renderedColumns = await frontendSkills.locator(".skill-bubbles").evaluate((grid) =>
      getComputedStyle(grid).gridTemplateColumns.split(" ").length,
    );
    expect(renderedColumns).toBe(4);

    const boxes = await Promise.all(
      Array.from({ length: 5 }, (_, index) => surfaces.nth(index).boundingBox()),
    );
    boxes.forEach((box) => expect(box).not.toBeNull());

    for (const box of boxes.slice(1, 4)) {
      expect(Math.abs(box!.y - boxes[0]!.y)).toBeLessThanOrEqual(1);
    }
    expect(boxes[4]!.y).toBeGreaterThan(boxes[0]!.y + boxes[0]!.height - 1);
  }
});

test("lays out contact content in responsive columns and squircle rows", async ({ page }) => {
  await page.goto("/");

  const contact = page.locator("#contact");
  const actions = contact.locator(".contact-actions a");
  const surfaces = contact.locator(".contact-action-surface");

  for (const width of [320, 390, 411, 412, 767, 768, 820, 821, 900, 901, 1024, 1222]) {
    await page.setViewportSize({ width, height: 900 });
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toHaveCSS("padding-left", "0px");
    await expect(contact).toHaveCSS("padding-right", "0px");

    const [emailBox, linkedInBox, githubBox, resumeBox, skillSquircleBox, actionsBox, copyBox, paragraphBox, backToTopBox] =
      await Promise.all([
        surfaces.nth(0).boundingBox(),
        surfaces.nth(1).boundingBox(),
        surfaces.nth(2).boundingBox(),
        surfaces.nth(3).boundingBox(),
        page.locator(".skill-bubble-surface").first().boundingBox(),
        contact.locator(".contact-actions").boundingBox(),
        contact.locator(".contact-copy").boundingBox(),
        contact.locator(".contact-copy p").boundingBox(),
        contact.locator(".contact-back-to-top").boundingBox(),
      ]);

    expect(emailBox).not.toBeNull();
    expect(linkedInBox).not.toBeNull();
    expect(githubBox).not.toBeNull();
    expect(resumeBox).not.toBeNull();
    expect(skillSquircleBox).not.toBeNull();
    expect(actionsBox).not.toBeNull();
    expect(copyBox).not.toBeNull();
    expect(paragraphBox).not.toBeNull();
    expect(backToTopBox).not.toBeNull();
    expect(Math.abs(emailBox!.y - linkedInBox!.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(emailBox!.y - githubBox!.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(emailBox!.y - resumeBox!.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(emailBox!.width - resumeBox!.width)).toBeLessThanOrEqual(1);
    if (width > 620) {
      expect(Math.abs(emailBox!.width - skillSquircleBox!.width)).toBeLessThanOrEqual(1);
      expect(Math.abs(emailBox!.height - skillSquircleBox!.height)).toBeLessThanOrEqual(1);
    } else {
      expect(emailBox!.width).toBeLessThanOrEqual(skillSquircleBox!.width);
      expect(emailBox!.height).toBeLessThanOrEqual(skillSquircleBox!.height);
    }
    expect(await surfaces.first().evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).borderRadius),
    )).toBeGreaterThanOrEqual(18);
    for (const action of await actions.all()) {
      const surface = action.locator(".contact-action-surface");
      const label = action.locator(".contact-action-label");
      const [surfaceBox, labelBox] = await Promise.all([
        surface.boundingBox(),
        label.boundingBox(),
      ]);
      expect(surfaceBox).not.toBeNull();
      expect(labelBox).not.toBeNull();
      expect(labelBox!.y).toBeGreaterThan(surfaceBox!.y + surfaceBox!.height - 1);
      expect(Math.abs(
        labelBox!.x + labelBox!.width / 2 - (surfaceBox!.x + surfaceBox!.width / 2),
      )).toBeLessThanOrEqual(1);
    }
    expect(backToTopBox!.y).toBeGreaterThan(paragraphBox!.y + paragraphBox!.height - 1);

    if (width >= 768) {
      expect(actionsBox!.x).toBeGreaterThan(copyBox!.x + copyBox!.width - 1);
      await expect(contact.locator(".contact-copy")).toHaveCSS("text-align", "left");
      expect(Math.abs(backToTopBox!.x - copyBox!.x)).toBeLessThanOrEqual(1);
    } else {
      const sectionCenter = copyBox!.x + copyBox!.width / 2;
      for (const box of [paragraphBox!, actionsBox!, backToTopBox!]) {
        expect(Math.abs(box.x + box.width / 2 - sectionCenter)).toBeLessThanOrEqual(1);
      }
      expect(actionsBox!.y).toBeGreaterThan(paragraphBox!.y + paragraphBox!.height - 1);
      expect(backToTopBox!.y).toBeGreaterThan(actionsBox!.y + actionsBox!.height - 1);
      await expect(contact.locator(".contact-copy")).toHaveCSS("text-align", "center");
    }
  }
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

  const [firstCard, secondCard, thirdCard] = await Promise.all([
    cards.nth(0).boundingBox(),
    cards.nth(1).boundingBox(),
    cards.nth(2).boundingBox(),
  ]);

  expect(firstCard).not.toBeNull();
  expect(secondCard).not.toBeNull();
  expect(thirdCard).not.toBeNull();

  if (page.viewportSize()!.width >= 1024) {
    expect(Math.abs(secondCard!.y - firstCard!.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(thirdCard!.y - firstCard!.y)).toBeLessThanOrEqual(1);
    expect(secondCard!.x).toBeGreaterThanOrEqual(firstCard!.x + firstCard!.width - 1);
    expect(thirdCard!.x).toBeGreaterThanOrEqual(secondCard!.x + secondCard!.width - 1);
  } else if (page.viewportSize()!.width >= 768) {
    expect(Math.abs(secondCard!.y - firstCard!.y)).toBeLessThanOrEqual(1);
    expect(secondCard!.x).toBeGreaterThanOrEqual(firstCard!.x + firstCard!.width - 1);
    expect(thirdCard!.y).toBeGreaterThanOrEqual(firstCard!.y + firstCard!.height - 1);
  } else {
    expect(secondCard!.y).toBeGreaterThanOrEqual(firstCard!.y + firstCard!.height - 1);
    expect(thirdCard!.y).toBeGreaterThanOrEqual(secondCard!.y + secondCard!.height - 1);
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

test("switches project columns at the exact mobile, tablet, and desktop boundaries", async ({ page }) => {
  await page.goto("/");

  const breakpoints = [
    { width: 767, columns: 1 },
    { width: 768, columns: 2 },
    { width: 1023, columns: 2 },
    { width: 1024, columns: 3 },
  ];

  for (const { width, columns } of breakpoints) {
    await page.setViewportSize({ width, height: 900 });
    const renderedColumns = await page.locator(".featured-projects").evaluate((grid) =>
      getComputedStyle(grid).gridTemplateColumns.split(" ").length,
    );

    expect(renderedColumns).toBe(columns);
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

test("uses the full section width for Skills, Projects, and Experience content", async ({ page }) => {
  await page.goto("/");

  const sections = [
    { id: "skills", content: ".skill-groups" },
    { id: "projects", content: ".featured-projects" },
    { id: "experience", content: ".experience-rows" },
  ];

  for (const { id, content } of sections) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();

    const [sectionBox, headingBox, contentBox] = await Promise.all([
      section.boundingBox(),
      section.locator(".section-heading").boundingBox(),
      section.locator(content).boundingBox(),
    ]);

    expect(sectionBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    expect(contentBox).not.toBeNull();
    expect(Math.abs(headingBox!.x - sectionBox!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(headingBox!.width - sectionBox!.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(contentBox!.x - sectionBox!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(contentBox!.width - sectionBox!.width)).toBeLessThanOrEqual(1);
  }
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

  const [sectionBox, headingBox] = await Promise.all([
    experienceSection.boundingBox(),
    experienceSection.locator(".section-heading").boundingBox(),
  ]);

  expect(sectionBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(Math.abs(headingBox!.x - sectionBox!.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(headingBox!.width - sectionBox!.width)).toBeLessThanOrEqual(1);

  for (const row of await rows.all()) {
    await expect(row).toHaveCSS("position", "relative");
    await expect(row).toHaveCSS("isolation", "isolate");
    await expect(row).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(row).toHaveCSS("backdrop-filter", /blur/);

    const [rowBox, period, content] = await Promise.all([
      row.boundingBox(),
      row.locator(".timeline-period").boundingBox(),
      row.locator(".timeline-content").boundingBox(),
    ]);

    expect(rowBox).not.toBeNull();
    expect(period).not.toBeNull();
    expect(content).not.toBeNull();
    expect(Math.abs(rowBox!.x - sectionBox!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(rowBox!.width - sectionBox!.width)).toBeLessThanOrEqual(1);
    expect(content!.y).toBeGreaterThanOrEqual(period!.y + period!.height - 1);
    expect(Math.abs(content!.x - period!.x)).toBeLessThanOrEqual(1);
  }
});

test("gives supporting project cards depth without filtering their source images", async ({ page }) => {
  await page.goto("/");

  const supportingProjectCards = page.locator("#experience .project-card-supporting");
  await expect(supportingProjectCards).toHaveCount(5);
  for (const card of await supportingProjectCards.all()) {
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("background-color", "rgba(255, 255, 255, 0.035)");
    await expect(card).toHaveCSS("background-image", /linear-gradient/);
    await expect(card).toHaveCSS("backdrop-filter", "none");
    await expect(card).not.toHaveCSS("box-shadow", "none");

    const image = card.locator("img");
    await expect(image).toHaveCSS("filter", "none");
    await expect(image).toHaveCSS("opacity", "1");

    const [mediaBox, nameBox, arrowBox] = await Promise.all([
      card.locator(".supporting-media").boundingBox(),
      card.locator(".supporting-copy").boundingBox(),
      card.locator(":scope > svg").boundingBox(),
    ]);

    expect(mediaBox).not.toBeNull();
    expect(nameBox).not.toBeNull();
    expect(arrowBox).not.toBeNull();
    expect(Math.abs(nameBox!.x - mediaBox!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(nameBox!.width - mediaBox!.width)).toBeLessThanOrEqual(1);
    expect(arrowBox!.y).toBeGreaterThanOrEqual(nameBox!.y + nameBox!.height - 1);
    expect(Math.abs(
      arrowBox!.x + arrowBox!.width - (mediaBox!.x + mediaBox!.width),
    )).toBeLessThanOrEqual(1);
  }
});

test("adds a five-percent upper-left highlight to every supporting project card", async ({ page }) => {
  await page.goto("/");

  const supportingProjectCards = page.locator("#experience .project-card-supporting");
  await expect(supportingProjectCards).toHaveCount(5);

  for (const card of await supportingProjectCards.all()) {
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("background-image", /linear-gradient/);
    await expect(card).toHaveCSS("border-color", "rgba(255, 255, 255, 0.18)");
    expect(await card.evaluate((element) => ({
      backgroundImage: getComputedStyle(element, "::after").backgroundImage,
      opacity: getComputedStyle(element, "::after").opacity,
    }))).toEqual({
      backgroundImage: expect.stringContaining("rgba(255, 255, 255, 0.05)"),
      opacity: "0",
    });

    await card.hover();

    await expect(card).toHaveCSS("background-image", /linear-gradient/);
    await expect(card).toHaveCSS("border-color", "rgba(255, 255, 255, 0.48)");
    await expect.poll(() => card.evaluate((element) =>
      getComputedStyle(element, "::after").opacity,
    )).toBe("1");
    await expect(card).not.toHaveCSS("transform", "none");
    await expect(card.locator("img")).not.toHaveCSS("transform", "none");
  }
});

test("keeps the Horizon screenshot fitted to its media frame at every grid width", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "This test iterates every responsive width");
  await page.goto("/");

  const horizonCard = page.locator("#experience .project-card-supporting").filter({
    hasText: "Horizon Energy",
  });

  for (const width of [390, 425, 426, 767, 768, 1024, 1222]) {
    await page.setViewportSize({ width, height: 900 });
    await horizonCard.scrollIntoViewIfNeeded();

    const image = horizonCard.locator("img");
    await expect
      .poll(() => image.evaluate(
        (element) => (element as HTMLImageElement).complete,
      ), { timeout: 15_000 })
      .toBe(true);

    const fit = await horizonCard.evaluate((card) => {
      const media = card.querySelector<HTMLElement>(".supporting-media")!;
      const image = media.querySelector<HTMLImageElement>("img")!;
      const mediaBox = media.getBoundingClientRect();
      const optimizedSource = new URL(image.currentSrc || image.src, window.location.href);

      return {
        mediaRatio: mediaBox.width / mediaBox.height,
        sourceRatio: image.naturalWidth / image.naturalHeight,
        sourcePath: optimizedSource.searchParams.get("url"),
      };
    });

    expect(fit.sourcePath).toBe("/projects/horizonenergy-16x10.png");
    expect(fit.mediaRatio).toBeCloseTo(1.6, 2);
    expect(Math.abs(fit.sourceRatio - fit.mediaRatio)).toBeLessThan(0.01);
  }
});

test("switches freelance project columns at the exact mobile and tablet boundaries", async ({ page }) => {
  await page.goto("/");

  const breakpoints = [
    { width: 425, columns: 1 },
    { width: 426, columns: 2 },
    { width: 767, columns: 2 },
    { width: 768, columns: 4 },
  ];

  for (const { width, columns } of breakpoints) {
    await page.setViewportSize({ width, height: 900 });
    const renderedColumns = await page.locator(
      "#experience [aria-label='Freelance website projects']",
    ).evaluate((grid) =>
      getComputedStyle(grid).gridTemplateColumns.split(" ").length,
    );

    expect(renderedColumns).toBe(columns);
  }
});

test("places the League Copilot card beneath its experience at every grid width", async ({ page }) => {
  await page.goto("/");

  const leagueProjects = page.locator("#experience [aria-label='League Copilot project']");
  const leagueExperience = page.locator("#experience .experience-row").filter({ has: leagueProjects });
  const leagueCard = leagueProjects.locator(".project-card-supporting");
  await expect(leagueExperience.getByRole("heading", {
    level: 4,
    name: "Selected work:",
  })).toHaveCount(0);
  await expect(leagueCard).toHaveCount(1);
  await expect(leagueCard).toHaveAttribute("href", "https://league-copilot.com/");

  for (const { width, columns } of [
    { width: 390, columns: 1 },
    { width: 425, columns: 1 },
    { width: 426, columns: 2 },
    { width: 767, columns: 2 },
    { width: 768, columns: 4 },
    { width: 1024, columns: 4 },
    { width: 1222, columns: 4 },
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await leagueCard.scrollIntoViewIfNeeded();
    await expect.poll(() => leagueCard.locator("img").evaluate(
      (element) => (element as HTMLImageElement).complete,
    )).toBe(true);

    const fit = await leagueCard.evaluate((card) => {
      const media = card.querySelector<HTMLElement>(".supporting-media")!;
      const image = media.querySelector<HTMLImageElement>("img")!;
      const mediaBox = media.getBoundingClientRect();
      const optimizedSource = new URL(image.currentSrc || image.src, window.location.href);

      return {
        columns: getComputedStyle(card.parentElement!).gridTemplateColumns.split(" ").length,
        mediaRatio: mediaBox.width / mediaBox.height,
        sourceRatio: image.naturalWidth / image.naturalHeight,
        sourcePath: optimizedSource.searchParams.get("url"),
      };
    });

    expect(fit.columns).toBe(columns);
    expect(fit.sourcePath).toBe("/projects/leaguecopilot-16x10.png");
    expect(fit.mediaRatio).toBeCloseTo(1.6, 2);
    expect(Math.abs(fit.sourceRatio - fit.mediaRatio)).toBeLessThan(0.01);
  }
});

test("keeps every supporting project name on one line at all grid widths", async ({ page }) => {
  await page.goto("/");

  for (const width of [320, 425, 426, 767, 768, 1024, 1235, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const nameMetrics = await page.locator("#experience .supporting-copy strong").evaluateAll((names) =>
      names.map((name) => {
        const styles = getComputedStyle(name);
        return {
          height: name.getBoundingClientRect().height,
          lineHeight: Number.parseFloat(styles.lineHeight),
          clientWidth: name.clientWidth,
          scrollWidth: name.scrollWidth,
        };
      }),
    );

    for (const metrics of nameMetrics) {
      expect(metrics.height).toBeLessThanOrEqual(metrics.lineHeight + 1);
      expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
    }

    const pageWidth = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(pageWidth.scroll).toBeLessThanOrEqual(pageWidth.client + 1);
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

test("mobile navigation keeps focus on the toggle when opened with a pointer", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile interaction contract");
  await page.goto("/");

  const toggle = page.locator(".menu-toggle");
  await expect(toggle).toHaveAccessibleName("Open navigation menu");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toBeFocused();
});

test("mobile navigation closes with Escape and returns keyboard focus", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile interaction contract");
  await page.goto("/");

  const toggle = page.locator(".menu-toggle");
  await toggle.focus();
  await page.keyboard.press("Enter");
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
