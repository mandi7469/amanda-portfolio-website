import { render, screen } from "@testing-library/react";
import { projects } from "@/data/portfolio";
import { Experience } from "./Experience";
import { Projects } from "./Projects";

describe("Portfolio project sections", () => {
  it("renders featured and supporting projects in their intended sections with safe external links", () => {
    render(
      <>
        <Projects />
        <Experience />
      </>,
    );

    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      const links = screen.getAllByRole("link").filter((link) => link.getAttribute("href") === project.liveUrl);
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute("target", "_blank");
      expect(links[0]).toHaveAttribute("rel", "noopener noreferrer");
      expect(links[0].closest("section")).toHaveAttribute(
        "id",
        project.featured ? "projects" : "experience",
      );
    }
  });
});
