const express = require("express");
const musicController = require("../controller/music.controller")
const route = express.Router();

route.post("/uploadMusic",musicController.uploadMusic)


module.exports = route