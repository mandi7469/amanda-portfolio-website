import { render, screen, within } from "@testing-library/react";
import { projects } from "@/data/portfolio";
import { Experience } from "./Experience";
import { Projects } from "./Projects";

describe("Portfolio project sections", () => {
  it("uses the supplied screenshots for each supporting project card", () => {
    expect(
      projects
        .filter((project) => !project.featured)
        .map(({ title, image }) => ({ title, image })),
    ).toEqual([
      { title: "BuildMyIO", image: "/projects/buildmyio.png" },
      { title: "Northstar Contract Supplies", image: "/projects/northstar.png" },
      { title: "Horizon Energy", image: "/projects/horizonenergy-16x10.png" },
      { title: "West Coast Electric Sales", image: "/projects/westcoast.png" },
      { title: "League Copilot", image: "/projects/leaguecopilot-16x10.png" },
    ]);
  });

  it("omits education from the professional experience section", () => {
    render(<Experience />);

    expect(screen.queryByRole("complementary", { name: "Education" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Education" })).not.toBeInTheDocument();
  });

  it("places freelance website projects with the freelance developer experience", () => {
    const { container } = render(<Experience />);
    const freelanceEntry = screen
      .getByRole("heading", { name: "Freelance Web Developer & Product Designer" })
      .closest<HTMLElement>(".timeline-entry");
    const freelanceProjects = container.querySelector<HTMLElement>(
      "[aria-label='Freelance website projects']",
    );

    expect(freelanceEntry).not.toBeNull();
    expect(freelanceProjects).not.toBeNull();
    expect(freelanceEntry).toContainElement(freelanceProjects);
    expect(within(freelanceEntry!).getByRole("heading", {
      level: 4,
      name: "Selected work:",
    })).toBeInTheDocument();
    expect(within(freelanceEntry!).queryByText("Freelance Website")).not.toBeInTheDocument();
  });

  it("splits professional experience into two ordered rows", () => {
    const { container } = render(<Experience />);
    const rows = Array.from(container.querySelectorAll<HTMLElement>("#experience .experience-row"));

    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByRole("heading", {
      name: "Freelance Web Developer & Product Designer",
    })).toBeInTheDocument();
    expect(within(rows[0]).getByLabelText("Freelance website projects")).toBeInTheDocument();
    expect(within(rows[1]).getByRole("heading", {
      name: "Frontend Developer / UI Contributor",
    })).toBeInTheDocument();
    expect(within(rows[1]).getByLabelText("League Copilot project")).toBeInTheDocument();
    expect(within(rows[1]).getByRole("link", {
      name: /League Copilot.*Open project in a new tab/,
    })).toHaveAttribute("href", "https://league-copilot.com/");
    expect(within(rows[1]).queryByRole("heading", {
      level: 4,
      name: "Selected work:",
    })).not.toBeInTheDocument();
    expect(within(rows[0]).queryByLabelText("League Copilot project")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Earlier experience" })).not.toBeInTheDocument();
  });

  it("renders each primary job description as an achievement list", () => {
    const { container } = render(<Experience />);
    const rows = Array.from(container.querySelectorAll<HTMLElement>("#experience .experience-row"));
    const freelanceHighlights = within(rows[0]).getAllByRole("listitem");
    const frontendHighlights = within(rows[1]).getAllByRole("listitem");

    expect(freelanceHighlights).toHaveLength(5);
    expect(freelanceHighlights[0]).toHaveTextContent("Designed, built, and deployed four production websites");
    expect(freelanceHighlights[4]).toHaveTextContent("Applied Codex and ChatGPT");
    expect(frontendHighlights).toHaveLength(3);
    expect(frontendHighlights[0]).toHaveTextContent("Developed and refined responsive React/TypeScript interfaces");
    expect(frontendHighlights[2]).toHaveTextContent("Added and maintained Vitest contract tests");
  });

  it("renders featured and supporting projects in their intended sections with safe external links", () => {
    const { container } = render(
      <>
        <Projects />
        <Experience />
      </>,
    );

    for (const project of projects) {
      expect(screen.getAllByText(project.title).length).toBeGreaterThan(0);
      const links = screen.getAllByRole("link").filter((link) => link.getAttribute("href") === project.liveUrl);
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute("target", "_blank");
      expect(links[0]).toHaveAttribute("rel", "noopener noreferrer");
      expect(links[0].closest("section")).toHaveAttribute(
        "id",
        project.featured ? "projects" : "experience",
      );
    }

    const featuredSection = container.querySelector<HTMLElement>("#projects");
    expect(featuredSection).not.toBeNull();
    expect(
      within(featuredSection!).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent),
    ).toEqual(["Recipe Vault", "Fairway Favorites", "Cosmic Quest"]);
    expect(
      Array.from(featuredSection!.querySelectorAll(".project-role"), (role) => role.textContent),
    ).toEqual(["Independent", "Independent", "Collaborative"]);

    const projectLinks = within(featuredSection!).getAllByRole("link", {
      name: "View project (opens in a new tab)",
    });
    const repositoryLinks = within(featuredSection!).getAllByRole("link", {
      name: "View repo (opens in a new tab)",
    });
    expect(projectLinks).toHaveLength(3);
    expect(repositoryLinks).toHaveLength(3);
    for (const projectLink of projectLinks) {
      expect(projectLink.querySelector("svg")).toHaveAttribute("stroke-width", "2.5");
    }
    for (const repositoryLink of repositoryLinks) {
      expect(repositoryLink.querySelector("svg path")).toHaveAttribute("fill", "currentColor");
    }

    const experienceSection = container.querySelector<HTMLElement>("#experience");
    expect(experienceSection).not.toBeNull();
    expect(
      within(experienceSection!).getByRole("heading", { level: 2, name: "Professional Experience" }),
    ).toBeInTheDocument();
  });
});
