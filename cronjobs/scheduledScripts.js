const Url = require("../models/Url");

async function deleteExpiredEntries() {
  try {
    await Url.deleteMany({ inactiveDate: { $lte: new Date() } });
  } catch (err) {
    console.log({ err });
  }
}

module.exports = { deleteExpiredEntries };
