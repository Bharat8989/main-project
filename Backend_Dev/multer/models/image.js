const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/uploadImg", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const userSchema = new mongoose.Schema({
  profilepic: {
    type: String,
    default: "default.png", // Default profile picture
  },
});

// Export the model
module.exports = mongoose.model("Image", userSchema);
