const {
  constructValidUrl,
  generateCode,
  addYears,
  ensureUniqueCode,
} = require("./index");

const Url = require("../models/Url");

jest.setTimeout(50000);
let mockFn;

beforeEach(() => {
  mockFn = jest.fn();
});

describe("utilities", () => {
  test("it should constructValidUrl", () => {
    expect(constructValidUrl("https://google.com")).toEqual(
      "https://google.com"
    );
    expect(constructValidUrl("google.com")).toEqual("https://google.com");
  });
  test("it should generateCode", () => {
    // TODO need a better way to test this code
    const first = generateCode();
    const second = generateCode();
    expect(first.length).toEqual(4);
    expect(second.length).toEqual(4);
    expect(first).not.toEqual(second);
  });

  test("it should addYears", () => {
    let originalDate = new Date(2022, 1, 2);
    const twoYears = addYears(2, originalDate);
    expect(twoYears - originalDate).toEqual(63072000000);
  });
  //  async () => {
  //    // TODO need a better way to test this code

  //    const first = await ensureUniqueCode(Url);
  //    const second = await ensureUniqueCode(Url);
  //    expect(first.length).toEqual(4);
  //    expect(second.length).toEqual(4);
  //    expect(first).not.toEqual(second);
  //  };
  it.todo("it should ensureUniqueCode");
});
