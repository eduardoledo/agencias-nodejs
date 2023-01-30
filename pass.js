const argon = require('argon2');

async function hash() {
  const hashedPassword = await argon.hash('akroma');

  console.log(hashedPassword);
}
hash();

