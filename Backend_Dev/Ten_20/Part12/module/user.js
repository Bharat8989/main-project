const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  image: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('user', userSchema);
