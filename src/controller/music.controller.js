const musicModel = require("../model/music.model");
const uploadFile = require("../services/cloud.services");
const jwt = require("jsonwebtoken");
const albumModel = require("../model/album.model");

const uploadMusic = async (req, res) => {
  const { music, title, artistName } = req.body;

  const buffer = req.file.buffer;

  const uploadFiles = await uploadFile(buffer);
  console.log(uploadFiles);

  const finalUpload = await musicModel.create({
    url: uploadFiles.url,
    title: req.body.title,
    artistName: req.user.id,
  });
  const populatedSong = await musicModel
    .findById(finalUpload._id)
    .populate("artistName", "name email role");

  res.status(200).json({
    message: "music uploaded",
    details: finalUpload,
    artistdetails: populatedSong,
  });
};

const createAlbum = async (req, res) => {
  const { title, music } = req.body;
  const album = await albumModel.create({
    title,
    artist: req.user.id,
    music: music,
  });

  res.status(200).json({
    message: "Album created successfully.",
    album,
  });
};

const viewAllMusic = async (req, res) => {
  const allMusics = await musicModel.find().skip(0)
  .limit(0);

  res.status(200).json({
    message: "All music data has been fetched.",
    musics: allMusics,
  });
};

const viewAlbum = async (req,res)=>{
     const albums = await albumModel.find().populate("music").populate("artist","username email")

     res.status(200).json({
      message:"The albums have been fetched.",
      totalAlbums : albums.length,
      albums:albums
     })
}


const albumSongs = async (req,res)=>{
  const id = req.params.id
  const album = await albumModel.findById(id).populate("music").populate("artist", "username email")
  res.status(200).json({
    message:"The album songs have been fetched.",
    album:album
  })
}

module.exports = { uploadMusic, createAlbum, viewAllMusic , viewAlbum ,albumSongs};
