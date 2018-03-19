const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Models
const User = require('../models/user');

// Register Post Route
router.post('/register', (req, res) => {
  const newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        newUser.password = hash;
        newUser.save(err => {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash('success', 'You are now registered and can log in');
            res.send();
          }
        });
      }
    });
  });
});

// Login Post Route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.send();
    }
    req.login(user, err => {
      if (err) throw err;
      return res.send(user);
    });
  })(req, res, next);
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  console.log('logout')
  res.send();
});

module.exports = router;