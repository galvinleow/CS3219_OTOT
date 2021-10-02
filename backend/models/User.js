const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: mongoose.SchemaTypes.ObjectId,
  password: String,
  name: String,
  username: String,
  isAdmin: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
