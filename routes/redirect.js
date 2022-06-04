const Url = require("../models/Url");
const { addYears } = require("../utilities");

async function redirect(req, res) {
  try {
    const { code } = req.params;
    let url = await Url.findOne({ code });

    if (url) {
      const { expirationDate } = url;
      const newInactiveDate = addYears(2);
      url.inactiveDate =
        newInactiveDate < expirationDate ? newInactiveDate : expirationDate;

      await url.save();

      return res.redirect(301, url.link);
    } else {
      console.log("no");
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = { redirect };
