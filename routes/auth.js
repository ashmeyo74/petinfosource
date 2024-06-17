const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

module.exports = router;
