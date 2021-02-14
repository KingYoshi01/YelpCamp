const express = require('express');
const passport = require('passport');
const users = require('../controllers/users');

const router = express.Router();

const auth = passport.authenticate('local', {
  failureFlash: true, 
  failureRedirect: '/login' 
});

router.route('/register')
  .get(users.renderRegister)
  .post(users.register);

router.route('/login')
  .get(users.renderLogin)
  .post(auth, users.login);

router.get('/logout', users.logout);

module.exports = router;