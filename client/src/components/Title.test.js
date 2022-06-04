import { render, screen } from "@testing-library/react";
import { CardTitle } from "./Title";

let testTitleId = "testTitleId";

function setup(props, testId) {
  render(<CardTitle {...props} data-testid={testId} />);
  const component = screen.getByTestId(testId);
  return { component, ...screen };
}
describe("Title Component", () => {
  it("should render", () => {
    const { component } = setup({}, testTitleId);

    expect(!!component).toBe(true);
  });
});
