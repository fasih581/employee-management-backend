const express = require("express");
const route = express.Router();
// const multer = require("multer");

const services = require("../services/render");
const controller = require("../controller/controller");

// // image upload
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   },
// });

// var upload = multer({
//     storage : storage,
// }).single("image");

// // Insert an user image into database route
// route.post('/api/employees', upload, (req, res) => {

// })

// @description root routes
// @method GET/
route.get("/", services.homeRoutes);

// get view employee page
route.get("/view/", services.viewRoutes);
route.get("/api/employees/search/:key", controller.searchEmployee);
route.get("/api/employees/:id", controller.getEmployee);// API
route.get("/api/employees", controller.getEmployees);
route.post("/api/employees", controller.create);
// route.get("/api/employees", controller.find);
route.put("/api/employees/:id", controller.update);
route.delete("/api/employees/:id", controller.delete);

module.exports = route;
