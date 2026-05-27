const express = require("express");
const musicController = require("../controller/music.controller");
const route = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

route.post(
  "/uploadMusic",
  authMiddleware.authArtist,
  musicController.uploadMusic,
);
route.post(
  "/createAlbum",
  authMiddleware.authArtist,
  musicController.createAlbum,
);

route.get("/allMusics", authMiddleware.authUser, musicController.viewAllMusic);
route.get("/allAlbums", authMiddleware.authArtist, musicController.viewAlbum);
route.get("/albumSongs/:id", authMiddleware.authUser, musicController.albumSongs);


module.exports = route;
