import { render, screen } from "@testing-library/react";

import { InfoBlock } from "./info-block";

describe("InfoBlock Component", () => {
  test("renders the InfoBlock component", () => {
    render(<InfoBlock />);

    const containerInfoBlock = screen.getByTestId("info-block");
    expect(containerInfoBlock).toBeInTheDocument();
  });

  test("should render a title", () => {
    render(<InfoBlock />);

    const titleElement = screen.getByTestId("info-block-title");
    expect(titleElement).toBeInTheDocument();

    expect(titleElement).toHaveTextContent(/This is a technical proof/i);
  });

  test("should render a description", () => {
    render(<InfoBlock />);

    const descriptionElement = screen.getByTestId("info-block-description");
    expect(descriptionElement).toBeInTheDocument();
  });
});
