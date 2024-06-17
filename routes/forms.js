const express = require('express');
const router = express.Router();

// New Pet Form Page
router.get('/newPetForm', (req, res) => {
  res.render('newPetForm', {
    title: 'New Pet Form'
  });
});

// Adoption Form Page
router.get('/adoptionForm', (req, res) => {
  res.render('adoptionForm', {
    title: 'Adoption Form'
  });
});

module.exports = router;
