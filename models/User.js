const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: { type: String, unique: true },
  password: String, 
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  image: {
    type: String,
  },  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
