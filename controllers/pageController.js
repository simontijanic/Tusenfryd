const Attraction = require('../models/Attraction');
const Reservation = require('../models/Reservation');
const AdminMessage = require('../models/AdminMessage');

exports.redirectHome = (req, res) => {
  res.redirect('/attractions');
};

exports.listAttractions = async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const attractions = await Attraction.find(query);
    let userReservations = [];
    let closedAttractions = attractions.filter(a => !a.isOpen);
    if (closedAttractions.length > 0) {
      req.flash('warning', `Følgende attraksjoner er stengt: ${closedAttractions.map(a => a.name).join(', ')}`);
    }
    if (req.session && req.session.isLoggedIn) {
      userReservations = await Reservation.find({ user: req.session.username }).select('attraction');
      userReservations = userReservations.map(r => r.attraction.toString());
    }
    res.render('attractions', { attractions, session: req.session, userReservations, messages: req.flash() });
  } catch (error) {
    res.status(500).send('Feil ved henting av attraksjoner');
  }
};

exports.reserveAttraction = async (req, res) => {
  if (!req.session || !req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) return res.status(404).send('Attraksjon ikke funnet');

    if (attraction.queue && attraction.queue.includes(req.session.username)) {
      return res.redirect('/attractions');
    }

    if (attraction.queue && attraction.queue.length >= attraction.queueCapacity) {
      return res.status(400).send('Køen er full for denne attraksjonen.');
    }

    attraction.queue = attraction.queue || [];
    attraction.queue.push(req.session.username);
    await attraction.save();

    const reservation = new Reservation({
      attraction: attraction._id,
      user: req.session.username
    });
    await reservation.save();
    res.redirect('/attractions');
  } catch (error) {
    res.status(500).send('Feil ved reservasjon');
  }
};

exports.adminPanel = async (req, res) => {
  try {
    const attractions = await Attraction.find();
    const reservations = await Reservation.find().populate('attraction');
    const adminMessages = await AdminMessage.find({ type: 'alert' }).sort({ createdAt: -1 }).limit(10);
    const chatMessages = await AdminMessage.find({ type: 'chat' }).sort({ createdAt: 1 }).limit(50);

    const reservationList = reservations.map(r => ({
      visitorName: r.user,
      attractionName: r.attraction ? r.attraction.name : 'Ukjent',
      time: r.reservationTime ? r.reservationTime.toLocaleString('no-NO') : ''
    }));
    res.render('admin', {
      attractions,
      reservations: reservationList,
      adminMessages,
      chatMessages,
      session: req.session
    });
  } catch (error) {
    res.status(500).send('Feil ved henting av admin-data');
  }
};

exports.postAlert = async (req, res) => {
  if (!req.session || !req.session.isAdmin) return res.status(403).send('Kun admin kan sende varsler');
  const { message, attractionId } = req.body;
  if (!message) return res.status(400).send('Varseltekst er påkrevd');
  await AdminMessage.create({ sender: req.session.username, message, type: 'alert', attraction: attractionId || undefined });
  res.redirect('/admin');
};

exports.postChat = async (req, res) => {
  if (!req.session || !req.session.isAdmin) return res.status(403).send('Kun admin kan chatte');
  const { message } = req.body;
  if (!message) return res.status(400).send('Melding er påkrevd');
  await AdminMessage.create({ sender: req.session.username, message, type: 'chat' });
  res.redirect('/admin');
};

exports.newAttractionForm = (req, res) => {
  res.render('newAttraction', { session: req.session });
};

exports.editAttractionForm = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) return res.status(404).send('Attraksjon ikke funnet');
    res.render('editAttraction', { attraction, session: req.session });
  } catch (error) {
    res.status(500).send('Feil ved lasting av attraksjon');
  }
};

exports.attractionDetails = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) return res.status(404).send('Attraksjon ikke funnet');
    let queuePosition = null;
    if (req.session && req.session.isLoggedIn && attraction.queue) {
      queuePosition = attraction.queue.indexOf(req.session.username);
      if (queuePosition !== -1) queuePosition += 1; // 1-based index
      else queuePosition = null;
    }
    res.render('attractionDetails', { attraction, session: req.session, queuePosition });
  } catch (error) {
    res.status(500).send('Feil ved lasting av attraksjon');
  }
};

exports.getLogin = (req, res) => {
  res.render('login', { error: null, session: req.session });
};

exports.getFaq = (req, res) => {
  res.render('faq', { session: req.session });
};

// Helper: Validate time in HH:MM format
function isValidTime(time) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

exports.newAttractionSubmit = async (req, res) => {
  const { name, description, openingTime, closingTime, waitTime, isOpen } = req.body;
  if (!isValidTime(openingTime) || !isValidTime(closingTime)) {
    return res.status(400).send('Ugyldig åpningstid eller stengetid. Bruk formatet HH:MM.');
  }
  try {
    await Attraction.create({
      name,
      description,
      openingTime,
      closingTime,
      waitTime,
      isOpen: isOpen === 'true'
    });
    res.redirect('/admin');
  } catch (error) {
    res.status(500).send('Feil ved oppretting av attraksjon');
  }
};

exports.editAttractionSubmit = async (req, res) => {
  const { name, description, openingTime, closingTime, waitTime, isOpen } = req.body;
  if (!isValidTime(openingTime) || !isValidTime(closingTime)) {
    return res.status(400).send('Ugyldig åpningstid eller stengetid. Bruk formatet HH:MM.');
  }
  try {
    await Attraction.findByIdAndUpdate(req.params.id, {
      name,
      description,
      openingTime,
      closingTime,
      waitTime,
      isOpen: isOpen === 'true'
    });
    res.redirect('/admin');
  } catch (error) {
    res.status(500).send('Feil ved oppdatering av attraksjon');
  }
};

exports.deleteAttraction = async (req, res) => {
  try {
    await Attraction.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    res.status(500).send('Feil ved sletting av attraksjon');
  }
};
