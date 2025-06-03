// handlers/authHandler.js
const User = require('../models/User');

// Login handler
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('login', { error: 'Brukernavn og passord er påkrevd', session: req.session });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('login', { error: 'Feil brukernavn eller passord', session: req.session });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { error: 'Feil brukernavn eller passord', session: req.session });
    }
    // Set session
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.isLoggedIn = true;
    req.session.isAdmin = user.username === 'admin';
    // Redirect based on role
    if (req.session.isAdmin) {
      return res.redirect('/admin');
    } else {
      return res.redirect('/attractions');
    }
  } catch (error) {
    res.render('login', { error: 'Feil ved innlogging', session: req.session });
  }
};

// Logout handler
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

// Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

exports.getLogin = (req, res) => {
    res.render('login', { error: null, session: req.session });
}