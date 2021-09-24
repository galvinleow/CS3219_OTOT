const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: mongoose.SchemaTypes.ObjectId,
  text: String,
  day: String,
  reminder: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", TaskSchema);
