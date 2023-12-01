const express = require('express');
const route = express.Router();


const services = require("../services/render");
const controller = require("../controller/controller");
const usercontroller = require("../controller/usercontroller");
const validateToken = require("../middleware/validateTokenHendler")
const isAuth = require("../Auth/isAuth");

// get login page
route.get("/api/login", services.loginRoutes);

// get sign page
route.get("/api/signup", services.signRoutes);

// usercontroller
// login
route.post("/user/login", usercontroller.checkEmp);

// signup
route.post("/user/signup", usercontroller.create);

// current user
route.get("/user/current", validateToken.validateToken, usercontroller.currentUser);

// logout
route.get("/user/logout", validateToken.validateToken, usercontroller.logout);
// end usercontroller

// @description root routes
// @method GET/
route.get("/",  services.homeRoutes);

// get view employee page
route.get("/view/",  services.viewRoutes);
// 
route.get("/api/employees/search/:key", controller.searchEmployee);
route.get("/api/employees/:id", controller.getEmployee);// API
route.get("/api/employees", controller.getEmployees);
route.post("/api/employees", controller.create);
// route.get("/api/employees", controller.find);
route.put("/api/employees/:id", controller.update);
route.delete("/api/employees/:id", controller.delete);

module.exports = route;
