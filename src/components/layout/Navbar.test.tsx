import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("opens accessibly and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Open navigation menu" });

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await waitFor(() => expect(screen.getAllByRole("link", { name: "Home" }).at(-1)).toHaveFocus());
    expect(document.body).toHaveClass("nav-open");

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(document.body).not.toHaveClass("nav-open");
  });
});
