const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] }, // type: [String], harus berupa array dan default: [], menetukan nilai default adalah array kosong
  isPinned: { type: Boolean, default: false },
  userId: { type: String, required: true },
  createdOn: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Note", noteSchema);
