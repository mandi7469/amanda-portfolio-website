import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders a single logo and copyright link without redundant navigation", () => {
    const { container } = render(<Footer />);

    expect(
      screen.getByText(/© \d{4} Developed and Designed by Amanda Changa/),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Amanda Changa, back to top" })).toHaveAttribute(
      "href",
      "#home",
    );
    expect(container.querySelector("nav")).not.toBeInTheDocument();
  });
});
