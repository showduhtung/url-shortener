import { render, screen } from "@testing-library/react";
import { Results } from "./Results";

let testResultsId = "testResultsId";

function setup(props, testId) {
  render(<Results {...props} data-testid={testId} />);
  const component = screen.getByTestId(testId);
  return { component, ...screen };
}
describe("Results Component", () => {
  it("should render", () => {
    const { component } = setup({}, testResultsId);

    expect(!!component).toBe(true);
  });
});
