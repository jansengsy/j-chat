const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: String,
  content: String,
  user_id: String,
  timestamp: { type: Date, default: Date.now },
});
messageSchema.statics.getMessagesWithFormattedTimestamps = async function (room) {
  const pipeline = [
    {
      $match: { room: room }
    },
    {
      $project: {
        room: 1,
        content: 1,
        user_id: 1,
        formattedTimestamp: {
          $dateToString: {
            format: "%H:%m",
            date: "$timestamp"
          }
        }
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result;
};

module.exports = mongoose.model('Message', messageSchema);
