const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.render('login', { title: 'Login', scripts: ['/js/login.js'] });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/forms', async (req, res) => {
  try {
    res.render('forms');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/adopt', (req, res) => {
  res.render('adoptionForm', { title: 'Adoption Form' });
});

router.get('/new-pet', (req, res) => {
  res.render('newPetForm', { title: 'New Pet Form' });
});

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
