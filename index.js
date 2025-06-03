require("dotenv").config()
const express = require("express")
const app = express()
const session = require('express-session');
const path = require('path');
const flash = require('express-flash');

const database = require("./config/databse")
const attractionRoutes = require('./routes/attractionRoutes'); // Added line
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');
const notFoundHandler = require('./middleware/notFoundHandler');
const errorHandler = require('./middleware/errorHandler');

database.connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use('/api/attractions', attractionRoutes);
app.use(authRoutes);
app.use(pageRoutes);

app.use(notFoundHandler.handler);
app.use(errorHandler.handler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
});
