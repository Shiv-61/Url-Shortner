function generate_url() {
  let new_url = "";
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < 6; i++) {
    new_url += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return new_url;
}

module.exports = generate_url;
