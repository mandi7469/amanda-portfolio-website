import { render, screen } from "@testing-library/react";
import { siteConfig } from "@/lib/site-config";
import { ContactActions } from "./ContactActions";

describe("ContactActions", () => {
  it("renders the contact destinations and back-to-top link", () => {
    render(<ContactActions />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: "Back to top" })).toHaveAttribute("href", "#home");
  });
});
