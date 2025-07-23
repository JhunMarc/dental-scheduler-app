const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);

router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  const User = require('../models/User');
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;