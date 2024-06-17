const express = require('express');
const router = express.Router();

// Route for Adoption Form Page
router.get('/forms/adoptionForm', (req, res) => {
  res.render('adoptionForm', {
    title: 'Adoption Form'
  });
});

module.exports = router;
