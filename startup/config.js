require('dotenv').config();
const config = require('config');

module.exports = function () {
  throw new Error("kutilmagan xato");
  if (!config.get("jwtPrivateKey")) {
    throw new Error("JIDDIY XATO: virtualdars_jwtPrivateKey muhit o`zgaruvchisi aniqlanmagan. ");
    
  }
};
