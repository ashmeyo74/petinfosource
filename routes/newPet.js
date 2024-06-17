const express = require('express');
const router = express.Router();

// Route for New Pet Form Page
router.get('/forms/newPetForm', (req, res) => {
  res.render('newPetForm', {
    title: 'New Pet Form'
  });
});

module.exports = router;
