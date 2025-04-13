const mongoose = require('mongoose');

const swipeSchema = new mongoose.Schema({
  fromUser: {
    type: Number,
    required: true,
  },
  toUser: {
    type: Number,
    required: true,
  },
  decision: {
    type: String,
    enum: ['accept', 'reject'],
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('MatchSwipe', swipeSchema);
