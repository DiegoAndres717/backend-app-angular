const mongoose = require("mongoose");

const conexionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connection");
  } catch (error) {
    console.log("Error al conectar DB");
  }
};

module.exports = conexionDB;
