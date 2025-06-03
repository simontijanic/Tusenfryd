// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Attraction = require('./models/Attraction');
const User = require('./models/User');
const Reservation = require('./models/Reservation');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Attraction.deleteMany({});
  await User.deleteMany({});
  await Reservation.deleteMany({});

  await Attraction.insertMany([
    {
      name: 'Thundercoaster',
      description: 'En heftig berg-og-dal-bane i tre med bratte bakker og høy fart. Passer for de som liker spenning!',
      openingTime: '10:00',
      closingTime: '18:00',
      waitTime: 15,
      isOpen: true
    },
    {
      name: 'SuperSplash',
      description: 'Vannattraksjon for hele familien med store plask og morsomme overraskelser.',
      openingTime: '11:00',
      closingTime: '17:00',
      waitTime: 10,
      isOpen: true
    },
    {
      name: 'Barnas karusell',
      description: 'Karusell for de minste barna med fargerike figurer og rolig musikk.',
      openingTime: '10:00',
      closingTime: '16:00',
      waitTime: 5,
      isOpen: true
    },
    {
      name: 'SpaceShot',
      description: 'Rakettoppskytning rett til værs! Kjenn suget i magen når du skytes opp i 65 meters høyde.',
      openingTime: '12:00',
      closingTime: '19:00',
      waitTime: 20,
      isOpen: false
    },
    {
      name: 'SpinSpider',
      description: 'En gigantisk pendel som svinger deg høyt over bakken mens du spinner rundt.',
      openingTime: '10:30',
      closingTime: '18:30',
      waitTime: 25,
      isOpen: true
    },
    {
      name: 'Eventyrslottet',
      description: 'Et magisk slott med overraskelser for hele familien. Perfekt for de yngste.',
      openingTime: '09:30',
      closingTime: '16:30',
      waitTime: 3,
      isOpen: true
    }
  ]);

  const admin = new User({ username: 'admin', password: 'admin123' });
  await admin.save();
  const user = new User({ username: 'user', password: 'user123' });
  await user.save();

  console.log('Seed complete!');
  process.exit();
};

seed();
