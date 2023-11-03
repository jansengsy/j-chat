const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  name: String,
  type: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('chat', chatSchema);
