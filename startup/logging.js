const winston = require('winston');
require('winston-mongodb');
require('express-async-errors'); // bu avtomatik ravishda try catch ni ichiga xatoni ilib oladi

module.exports = function () {
  winston.add(new winston.transports.Console());
  winston.add(new winston.transports.File({ filename: "logs/vd-logs.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/virtualdars-logs",
    })
  );
  winston.exceptions.handle(new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/vd-logs.log" })
  ); // => bu pastdagi kodni vazifasini bajaradi.
  // process.on('uncaughtException' , ex => {
  //     winston.error(ex.message, ex);
  //     process.exit(1);
  // });
  // node dasturlarida birorta Exception catch yordamida ilib olinmagan bo`lsa, uncoughException hodisasi ro`y beradi.
  // va bunga obuna bo`lib, bu xaatoni ilib olishimiz mumkin.
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
