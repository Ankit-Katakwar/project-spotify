const express = require("express");

const routes = express.Router();

const authController = require("../controller/auth.controller");

routes.post("/register", authController.registerUser);
routes.post("/login", authController.loginUser);

module.exports = routes;
