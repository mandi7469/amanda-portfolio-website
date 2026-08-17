import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("opens accessibly and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Open navigation menu" });

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const mobileNavigation = document.getElementById("mobile-navigation");
    expect(mobileNavigation).toHaveAttribute("aria-hidden", "false");
    expect(within(mobileNavigation!).getByRole("link", { name: "Hire me" })).toHaveAttribute("href", "#contact");
    await waitFor(() => expect(screen.getAllByRole("link", { name: "Home" }).at(-1)).toHaveFocus());
    expect(document.body).toHaveClass("nav-open");

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(document.body).not.toHaveClass("nav-open");
  });

  it("closes on an outside click without rendering an overlay control", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Open navigation menu" });

    await user.click(toggle);

    expect(screen.getAllByRole("button", { name: "Close navigation menu" })).toHaveLength(1);
    await user.click(document.body);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body).not.toHaveClass("nav-open");
  });
});
