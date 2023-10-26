const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: String,
  content: String,
  user_id: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
