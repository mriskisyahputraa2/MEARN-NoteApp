const mongoose = require("mongoose"); // impor mongoose
const Schema = mongoose.Schema; // Mendefinisikan Schema dari Mongoose, yang digunakan untuk membuat skema model.

// mendefinisikan struktur dokumen "User" dalam koleksi (collection) MongoDB.
const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  createdOn: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", userSchema);
