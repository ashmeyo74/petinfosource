const express = require('express');
const router = express.Router();
const axios = require('axios');

// Handle form submission for adoption
router.post('/adopt', async (req, res) => {
    const { petId, adopterDetails } = req.body;
    try {
        const response = await axios.post('https://api.adoption.com/adopt', { petId, adopterDetails });
        res.redirect('/thank-you');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
