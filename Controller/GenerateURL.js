function generate_url(url) {
  let new_url = "";
  for (let index = 0; index < 5; index++) {
    const charCode = Math.floor(Math.random() * 122 - 97 + 1) + 97;
    new_url += String.fromCharCode(charCode);
  }
  return JSON.parse(new_url);
}

module.exports = generate_url;
