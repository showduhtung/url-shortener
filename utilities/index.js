function constructValidUrl(link) {
  if (!link.indexOf("http://") || !link.indexOf("https://")) return link;
  return "https://" + link;
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function generateCode() {
  let code = "";

  function generateCharacter() {
    let char = alphabet[Math.floor(Math.random() * 26)];
    code = code + char;
    if (code.length < 4) generateCharacter();
  }
  generateCharacter();
  return code;
}

function addYears(num, date = new Date()) {
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];
  return new Date(year + num, month, day);
}

async function ensureUniqueCode(Url) {
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

module.exports = {
  constructValidUrl,
  generateCode,
  addYears,
  ensureUniqueCode,
};
