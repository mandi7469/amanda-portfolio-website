import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { siteConfig } from "@/lib/site-config";
import { ContactActions } from "./ContactActions";

describe("ContactActions", () => {
  it("copies the public email and announces success", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    render(<ContactActions />);

    await user.click(screen.getByRole("button", { name: "Copy email address" }));

    expect(writeText).toHaveBeenCalledWith(siteConfig.email);
    expect(screen.getByRole("button", { name: "Email copied" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Email address copied to clipboard.");
  });
});
