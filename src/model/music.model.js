const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  url: { type: String, requrird: true },
  title: { type: String, required: true },
  artistName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: "true",
  },
});

const musicModel = mongoose.model("musics", musicSchema);
module.exports = musicModel;
