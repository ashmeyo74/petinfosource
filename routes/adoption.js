const express = require('express');
const router = express.Router();

router.get('/adopt', (req, res) => {
    res.render('adoptionForm', { title: 'Adoption Form' });
});

module.exports = router;
