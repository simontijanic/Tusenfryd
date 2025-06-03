exports.handler = (req, res, next) => {
  res.status(404);
  // Log the 404 error
  console.error(`[404] Not found: ${req.method} ${req.originalUrl}`);
  req.flash('error', `Siden ${req.originalUrl} finnes ikke.`);
  // Ensure messages is always available
  res.render('404', { url: req.originalUrl, session: req.session, messages: res.locals.messages || {} });
};
