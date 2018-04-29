// const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');
const db = require('../models/');

// Post registration
const userController = {
  isAuthenticated(req, res, next) {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.isAuthenticated && req.isAuthenticated() === 'true') {
      if (typeof next === 'function') {
        return next();
      }
      return res.json({ user: req.user });
    }

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE, or atleat don't return priviledged data
    return res.json({ user: null });
  },

  doRegister(req, res) {
    const data = {
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullname,
      homeLocationCity: req.body.homeLocationCity,
      homeLocationCountry: req.body.homeLocationCountry,
      // internLocation: req.body.internLocation,
      internLocationCity: req.body.internLocationCity,
      internLocationCountry: req.body.internLocationCountry,
    };
    User.register(new User(data), req.body.password, (err, user) => {
      if (err) {
      // return res.render('register', { user : user });
        console.log('error', err);
        return res.json(err);
      }

      return passport.authenticate('local')(req, res, () => {
        // res.redirect('/');
        res.json({ user });
      });
    });
  },

  // Post login
  doLogin(req, res) {
    passport.authenticate('local')(req, res, () => {
    // res.redirect('/');
      User.findById(req.user._id)
        .populate('expRef')
        .populate('needsRef')
        .populate('chapterRef')
        .then(result => {
          console.log("result after populate: ", result);
          return res.json({ user: result});
        })
          //return res.json({ user: req.user });
    });
  },

  // logout
  logout(req, res) {
    req.logout();
    res.json({ user: null });
  },
  getCurrentUser(req, res) {
    if (req.isAuthenticated && req.isAuthenticated()) {
    // if (req.user && req.user._id) {
      return res.json({ user: req.user });
    }
    return res.json({ user: null });
  }
};


module.exports = userController;
