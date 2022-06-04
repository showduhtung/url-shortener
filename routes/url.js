const { constructValidUrl, ensureUniqueCode } = require("../utilities/index");
const Url = require("../models/Url");

async function saveUrl(req, res) {
  let { url: link } = req.body;
  link = constructValidUrl(link);
  try {
    const count = await Url.count();
    if (count >= 241100) {
      return res.status(507).json({ message: "Database is overloaded" });
    }
    const code = await ensureUniqueCode(Url);
    if (code.message) return res.status(500).json({ code });

    let url = new Url({ code, link });
    await url.save();

    res.status(200).json(url);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { saveUrl };
