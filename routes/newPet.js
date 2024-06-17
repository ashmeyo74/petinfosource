const express = require('express');
const router = express.Router();

router.get('/new-pet', (req, res) => {
    res.render('newPetForm', { title: 'New Pet Form' });
});

module.exports = router;
