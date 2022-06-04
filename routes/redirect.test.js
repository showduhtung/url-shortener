const { redirect } = require("./redirect");
const Url = require("../models/Url");

jest.setTimeout(30000);
let mockFn = jest.fn();
let res;

beforeEach(() => {
  res = {
    redirect: mockFn,
    status: function (s) {
      this.statusCode = s;
      return this;
    },
    json: function (d) {
      console.log("\n : " + d);
    },
  };
});

describe("redirect", () => {
  test("should respond to /:code", async () => {
    let req = { params: { code: "iuao" } };

    try {
      await redirect(req, res);
      expect(res.redirect).toHaveBeenCalled();
    } catch (err) {
      console.error(err);
    }
  });
  test("should have status code 404 to incorrect /:code", async () => {
    let req = { params: { code: "a" } };

    try {
      await redirect(req, res);
      expect(mockFn).not.toHaveBeenCalled();
      expect(res.status).toEqual(404);
    } catch (err) {
      console.error(err);
    }
  });
});
