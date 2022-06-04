const { saveUrl } = require("./url");

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

describe("url", () => {
  test("should post a valid url correctly", async () => {
    let req = { body: { url: "https://google.com" } };

    try {
      await saveUrl(req, res);
      expect(res.status).toEqual(200);
    } catch (err) {
      console.error(err);
    }
  });
});
