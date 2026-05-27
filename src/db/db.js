const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the database.");
  } catch (err) {
    console.log("Error:", err);
  }
};

module.exports = connectDb;
