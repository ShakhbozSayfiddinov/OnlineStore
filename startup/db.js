const  mongoose  = require("mongoose");
const winston = require("winston");


module.exports = function () {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      winston.debug("mongodbga ulanish hosil qilindi");
    })
};
