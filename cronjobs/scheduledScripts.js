const Url = require("../models/Url");

async function deleteExpiredEntries() {
  try {
    await Url.deleteMany({ inactiveDate: { $gte: new Date() } });
    console.log("deleted many");
  } catch (err) {
    console.log({ err });
  }
}

module.exports = { deleteExpiredEntries };
