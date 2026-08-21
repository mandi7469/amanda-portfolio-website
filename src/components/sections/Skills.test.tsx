import { render, screen } from "@testing-library/react";
import { Skills } from "./Skills";

describe("Skills", () => {
  it("renders Languages before Frontend", () => {
    render(<Skills />);

    const groupHeadings = screen.getAllByRole("heading", { level: 3 });

    expect(groupHeadings.slice(0, 2).map((heading) => heading.textContent)).toEqual([
      "Languages",
      "Frontend",
    ]);
  });

  it("renders every skill as a labeled icon bubble", () => {
    render(<Skills />);

    const skillItems = screen.getAllByRole("listitem");

    expect(skillItems).toHaveLength(29);
    skillItems.forEach((item) => {
      expect(item.querySelector("svg")).not.toBeNull();
      expect(item.querySelector(".skill-bubble-label")).not.toBeNull();
      expect(item.querySelector(".skill-bubble-label")).not.toHaveTextContent(/^\s*$/);
    });
  });
});
