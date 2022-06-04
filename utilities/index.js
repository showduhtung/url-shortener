function constructValidUrl(link) {
  if (!link.indexOf("http://") || !link.indexOf("https://")) return link;
  return "https://" + link;
}

const BASE = [
  { num: 26, bank: "abcdefghijklmnopqrstuvwxyz" },
  { num: 10, bank: "0123456789" },
];

function generateCode() {
  let code = "";

  function generateCharacter() {
    let decision = Math.floor(Math.random() * 2);
    const { bank, num } = BASE[decision];

    let char = bank[Math.floor(Math.random() * num)];
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

async function createRandomCode(Url) {
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
  createRandomCode,
};
