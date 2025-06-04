const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  attraction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction',
    required: true
  },
  user: {
    type: String, 
    required: true
  },
  reservationTime: {
    type: Date,
    default: Date.now
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
