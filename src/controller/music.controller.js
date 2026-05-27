const musicModel = require("../model/music.model");
const uploadFile = require("../services/cloud.services");
const jwt = require("jsonwebtoken");
const uploadMusic = async (req, res) => {


  const isToken = req.cookies.token

   if(!isToken){
    return res.status(401).json({
      message:"Please login from your spotify artist account."
    })
   }

  try{
      const decoded  = jwt.verify(isToken,process.env.JWT_SECRET)

      if(!decoded.role === "artist"){
        res.status(400).json({
          message:"You can only upload music through the artist account."
        })
      }

      
  const { music, title, artistName } = req.body;

  const buffer = req.file.buffer;

  const uploadFiles = await uploadFile(buffer);
  console.log(uploadFiles);
  

  const finalUpload = await musicModel.create({
    url: uploadFiles.url,
    title: req.body.title,
    artistName: decoded.id,
  });
  const populatedSong = await musicModel
  .findById(finalUpload._id)
  .populate("artistName", "name email role") 

  res.status(200).json({
    message: "music uploaded",
    details: finalUpload,
    artistdetails:populatedSong

  });
  }catch(err){
    res.statu(401).json({
      message:"Unauthorised request.",
      err:err
    })
  }


};

module.exports = { uploadMusic };
    