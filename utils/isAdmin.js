// utils/isAdmin.js
module.exports = (req, res, next) => {
  if (req.session && req.session.isAdmin) return next();
  res.redirect('/login');
};
