const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  openingTime: {
    type: String, // Consider using Date type for more complex time operations
    required: true
  },
  closingTime: {
    type: String, // Consider using Date type for more complex time operations
    required: true
  },
  waitTime: {
    type: Number, // in minutes
    default: 0
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  queueCapacity: {
    type: Number,
    default: 20 // default max queue size
  },
  queue: [{
    type: String // username
  }]
  // You might want to add more fields later, like image, capacity, etc.
});

const Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;
