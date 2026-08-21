import { render, screen } from "@testing-library/react";
import { OpenGraphCard } from "./opengraph-image";

describe("OpenGraphCard", () => {
  it("uses the smoke poster and white brand logo", () => {
    render(
      <OpenGraphCard
        smokePosterSrc="/media/smoke-opengraph.jpg"
        whiteLogoSrc="/brand/ac-logo-white.svg"
      />,
    );

    expect(screen.getByRole("img", { name: "Amanda Changa logo" })).toHaveAttribute(
      "src",
      "/brand/ac-logo-white.svg",
    );
    expect(document.querySelector('img[src="/media/smoke-opengraph.jpg"]')).not.toBeNull();
    expect(screen.getByText("Amanda Changa")).toBeInTheDocument();
    expect(screen.getByText("Frontend · Full-Stack · AI-Assisted Developer")).toBeInTheDocument();
  });
});
