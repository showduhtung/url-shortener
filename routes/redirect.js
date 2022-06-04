const express = require("express");
const Url = require("../models/Url");

const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    let url = await Url.findOne({ code });

    if (url) {
      const { expirationDate } = url;
      const newInactiveDate = addYears(2);
      url.inactiveDate =
        newInactiveDate < expirationDate ? newInactiveDate : expirationDate;

      await url.save();

      return res.redirect(url.link);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

function addYears(num, date = new Date()) {
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];
  return new Date(year + num, month, day);
}
