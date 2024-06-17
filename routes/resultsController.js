const express = require('express');
const router = express.Router();
const db = require('../models'); // Assuming you are using a database ORM like Sequelize

// Route to display results from the database
router.get('/results', async (req, res) => {
    try {
        const results = await db.Results.findAll();
        res.render('results', { results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
