import { render, screen, within } from "@testing-library/react";
import { siGithub } from "simple-icons";
import { siteConfig } from "@/lib/site-config";
import { Contact } from "./Contact";
import { ContactActions } from "./ContactActions";

describe("ContactActions", () => {
  it("renders the four contact destinations", () => {
    render(<ContactActions />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      `mailto:${siteConfig.email}`,
    );

    for (const [name, href] of [
      [/LinkedIn.*opens in a new tab/, siteConfig.linkedin],
      [/GitHub.*opens in a new tab/, siteConfig.github],
    ]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
      "href",
      siteConfig.resume,
    );
    expect(screen.queryByRole("link", { name: "Back to top" })).not.toBeInTheDocument();

    for (const label of ["Email", "LinkedIn", "GitHub", "Resume"]) {
      const link = screen.getByText(label, { selector: ".contact-action-label" }).closest("a");
      expect(link).not.toBeNull();
      expect(link?.querySelector(".contact-action-surface :is(svg, img)")).not.toBeNull();
    }

    for (const [name, src] of [
      ["Email", "/icons/contact-email.png"],
      [/LinkedIn.*opens in a new tab/, "/icons/contact-linkedin.png"],
      ["Resume", "/icons/contact-resume.png"],
    ] as const) {
      expect(screen.getByRole("link", { name }).querySelector("img")).toHaveAttribute("src", src);
    }

    expect(
      screen
        .getByRole("link", { name: /GitHub.*opens in a new tab/ })
        .querySelector(".contact-action-surface path"),
    ).toHaveAttribute("d", siGithub.path);
  });

  it("groups the back-to-top link with the contact copy", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading", { name: "Let's work together." });
    const contactCopy = heading.parentElement;
    const backToTop = screen.getByRole("link", { name: "Back to top" });

    expect(contactCopy).not.toBeNull();
    expect(within(contactCopy!).getByText(/Have a role, project, or product/)).toBeInTheDocument();
    expect(within(contactCopy!).getByRole("link", { name: "Back to top" })).toBe(backToTop);
    expect(backToTop).toHaveAttribute("href", "#home");
    expect(backToTop.querySelector("svg")).toHaveAttribute("stroke-width", "2.5");
  });
});
