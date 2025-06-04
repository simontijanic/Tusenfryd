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
    type: String,
    required: true
  },
  closingTime: {
    type: String,
    required: true
  },
  waitTime: {
    type: Number,
    default: 0
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  queueCapacity: {
    type: Number,
    default: 20 
  },
  queue: [{
    type: String
  }],
  image: {
    type: String,
    default: 'placeholder.jpg'
  }
});

const Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;
