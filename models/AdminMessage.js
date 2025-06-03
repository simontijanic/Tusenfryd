// models/AdminMessage.js
const mongoose = require('mongoose');

const adminMessageSchema = new mongoose.Schema({
  sender: {
    type: String, // username
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['alert', 'chat'],
    default: 'alert'
  },
  attraction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction',
    required: false
  }
});

const AdminMessage = mongoose.model('AdminMessage', adminMessageSchema);

module.exports = AdminMessage;
