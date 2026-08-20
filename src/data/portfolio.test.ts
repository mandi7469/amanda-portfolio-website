import { experience, navItems, projects, skillGroups } from "./portfolio";
import { siteConfig } from "@/lib/site-config";

describe("portfolio content contracts", () => {
  it("keeps the approved section and project inventory", () => {
    expect(navItems.map((item) => item.href)).toEqual([
      "#home",
      "#skills",
      "#projects",
      "#experience",
      "#contact",
    ]);
    expect(projects).toHaveLength(8);
    expect(projects.filter((project) => project.featured).map((project) => project.title)).toEqual([
      "Recipe Vault",
      "Fairway Favorites",
      "Cosmic Quest",
    ]);
    expect(projects.filter((project) => !project.featured).map((project) => project.title)).toEqual([
      "BuildMyIO",
      "Northstar Contract Supplies",
      "Horizon Energy",
      "West Coast Electric Sales",
      "League Copilot",
    ]);
    expect(skillGroups.length).toBeGreaterThanOrEqual(5);
    expect(experience[0].period).toContain("Present");
  });

  it("exposes only the approved public contact details", () => {
    expect(siteConfig.email).toBe("amandachanga7@gmail.com");
    expect(siteConfig.github).toBe("https://github.com/mandi7469");
    expect(siteConfig.linkedin).toBe("https://www.linkedin.com/in/amanda-changa");
    expect(JSON.stringify(siteConfig)).not.toMatch(/\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  });
});
