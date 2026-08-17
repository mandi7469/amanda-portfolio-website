import { render, screen } from "@testing-library/react";
import { projects } from "@/data/portfolio";
import { Projects } from "./Projects";

describe("Projects", () => {
  it("renders every verified project with safe external links", () => {
    render(<Projects />);

    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      const links = screen.getAllByRole("link").filter((link) => link.getAttribute("href") === project.liveUrl);
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute("target", "_blank");
      expect(links[0]).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
