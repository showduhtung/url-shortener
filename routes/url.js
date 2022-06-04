const express = require("express");
const { constructValidUrl, generateCode } = require("../utilities/index");
const Url = require("../models/Url");

const router = express.Router();

router.post("/", async (req, res) => {
  let { url: link } = req.body;
  link = constructValidUrl(link);
  try {
    const count = await Url.count();
    if (count >= 241100) {
      // DB is full at ~265000 entries (512MB free storage)
      return res.status(507).json({ message: "Database is overloaded" });
    }
    const code = await createRandomCode();
    if (code.message) return res.status(500).json({ code });

    let url = new Url({ code, link });
    await url.save();

    res.status(200).json(url);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

async function createRandomCode() {
  let code = generateCode();
  let url;
  while (url || url === undefined) {
    try {
      let response = await Url.findOne({ code });
      url = response;
      code = generateCode();
    } catch (err) {
      return err;
    }
  }

  return code;
}
