const router = require('express').Router();
const { User } = require('../../models');

// POST endpoint to create new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      const { password, ...userWithoutPassword } = user.get();
      res
        .status(200)
        .json({ user: userWithoutPassword, message: 'User Registered' });
    });
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
});

// POST endpoint to login user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      const { password, ...userWithoutPassword } = user.get();
      res
        .status(200)
        .json({ user: userWithoutPassword, message: 'You are now logged in!' });
    });
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
});

// POST endpoint to logout user
router.post('/logout', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error });
  }
});

module.exports = router;
