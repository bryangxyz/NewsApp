const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

// Local Mongodb connection
// mongoose.connect(config.database);
// Mlab connection
const mongoURI = 'mongodb://bryan:bryan@ds249545.mlab.com:49545/news';
mongoose.connect(mongoURI);
let db = mongoose.connection;

// Check connection
db.once('open', () => console.log('Connected to MongoDb'));

// Check for DB errors
db.on('error', (err) => console.log(err));

// Init App
const app = express();

// Bring in Models
const Article = require('./models/article');

// Body-parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Express Messages Middleware
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

const port = 5000;

// Route Files
const articles = require('./routes/articles');
const users = require('./routes/users');

app.use('/articles', articles);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
})