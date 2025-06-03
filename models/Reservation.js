const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  attraction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction',
    required: true
  },
  user: {
    // Assuming you'll have a User model later. For now, storing a simple identifier.
    type: String, 
    required: true
  },
  reservationTime: {
    type: Date,
    default: Date.now
  },
  // You might want to add more fields like estimated queue time, notification status, etc.
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
