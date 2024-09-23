const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://shahilgope007:EFOnkF9U27Q4ktns@namastenode.w894j.mongodb.net/devTinder"
  );
  console.log("Connected to db");
};

module.exports = {
  connectDb,
};
