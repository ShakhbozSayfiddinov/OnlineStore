const express = require('express');
const errorMiddleware = require('../middleware/error');
const categoriesRauter = require('../router/categories');
const customersRauter = require('../router/customers');
const coursesRouter  = require('../router/courses');
const entrollmentsRoute = require('../router/enrollments');
const usersRoute = require('../router/users');
const authRoute = require('../router/auth');
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categoriesRauter);
  app.use("/api/customers", customersRauter);
  app.use("/api/courses", coursesRouter);
  app.use("/api/enrollments", entrollmentsRoute);
  app.use("/api/users", usersRoute);
  app.use("/api/auth", authRoute);
  app.use(errorMiddleware);
};
