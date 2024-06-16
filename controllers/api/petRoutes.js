const router = require('express').Router();
const upload = require('../../utils/uploadConfig');
const { Pet } = require('../../models');
const { APP_HOST, PORT } = require('../../utils/constants');

// POST endpoint to add a pet that includes an image upload
router.post('/', upload.single('petImageUrl'), async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json({ message: 'Please log in to add a pet' });
      return;
    }
    const pet = await Pet.create({
      ...req.body,
      owner_id: req.session.user_id,
      petImageUrl: `http://${APP_HOST}:${PORT}/${req.file.path.replace(
        'public/',
        ''
      )}`,
    });
    res.status(201).json({ message: 'Pet added successfully', pet });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
});

// GET endpoint to fetch all pets by user
router.get('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json({ message: 'Please log in to view pets' });
      return;
    }
    const pets = await Pet.findAll({
      where: { owner_id: req.session.user_id },
    });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
});

module.exports = router;
