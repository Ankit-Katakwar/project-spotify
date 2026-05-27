const { ImageKit } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: "private_KlGqp4ZLxTWl5MAiM/SsVf0gL4o=",
});

const uploadFile = async (buffer) => {
  const result = await client.files.upload({
    file: buffer.toString("base64"),
    fileName: "music_" + Date.now(),
    folder: "spotify/musics",
  });
  return result;
};
module.exports = uploadFile;
