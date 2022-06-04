import { fireEvent, render, screen } from "@testing-library/react";
import { Form } from "./Form";

let testFormId = "testFormId";

function setup(props, testId) {
  render(<Form {...props} data-testid={testId} />);
  const component = screen.getByTestId(testId);
  return { component, ...screen };
}
describe("Form Component", () => {
  it("should render", () => {
    const { component } = setup({}, testFormId);

    expect(!!component).toBe(true);
  });

  it("should handle validation", () => {
    let mockFn = jest.fn();
    const { getByRole, getByLabelText } = setup(
      { handleSubmit: mockFn },
      testFormId
    );

    let button = getByRole("button", {
      name: /Shorten my link/i,
    });

    expect(!!button).toBe(true);
    fireEvent.click(button);
    expect(mockFn).not.toHaveBeenCalled();

    let input = getByLabelText("Enter Link Here", { exact: false });

    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.click(button);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should handle click", () => {
    let mockFn = jest.fn();
    const { getByLabelText, getByRole } = setup(
      { handleSubmit: mockFn },
      testFormId
    );

    let input = getByLabelText("Enter Link Here", { exact: false });

    fireEvent.change(input, { target: { value: "google.com" } });

    expect(!!input).toBe(true);
    expect(input.value).toBe("google.com");

    let button = getByRole("button", {
      name: /Shorten my link/i,
    });

    expect(!!button).toBe(true);
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });

  it("should clear errors on change", () => {
    let mockFn = jest.fn();
    const { getByLabelText, getByText, queryByText, getByRole } = setup(
      { handleSubmit: mockFn },
      testFormId
    );

    let input = getByLabelText("Enter Link Here", { exact: false });

    fireEvent.change(input, { target: { value: "abc" } });

    let button = getByRole("button", {
      name: /Shorten my link/i,
    });

    fireEvent.click(button);

    expect(!!getByText("Not a valid url")).toBe(true);
    input = getByLabelText("Enter Link Here", { exact: false });
    fireEvent.keyDown(input, { key: "A", code: "KeyA" });
    expect(queryByText("Not a valid url")).toBe(null);
  });

  it("should show error when input is longer than 2000 characters", () => {
    const { getByLabelText, getByText, getByRole } = setup({}, testFormId);

    let input = getByLabelText("Enter Link Here", { exact: false });

    fireEvent.change(input, { target: { value: longCharacter } });
    let button = getByRole("button", {
      name: /Shorten my link/i,
    });

    fireEvent.click(button);
    expect(!!getByText("Links cannot be over 2000 characters")).toBe(true);
  });
});

const longCharacter =
  "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdef";
