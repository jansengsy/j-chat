const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: Number,
  content: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
