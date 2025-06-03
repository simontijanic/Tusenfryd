exports.handler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  req.flash('error', err.message || 'En ukjent feil oppstod.');
  res.status(500);
  res.render('error', { error: err, session: req.session, messages: res.locals.messages || {} });
};
