const express = require("express");
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

// @description root routes
// @method GET/
route.get("/", services.homeRoutes);

// API
route.post('/api/employees', controller.create);
route.get("/api/employees", controller.find);
route.put("/api/employees/:id", controller.update);
route.delete("/api/employees/:id", controller.delete);

module.exports = route;
