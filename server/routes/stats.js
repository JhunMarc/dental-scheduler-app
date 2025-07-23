const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/users/count', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  const count = await require('../models/User').countDocuments();
  res.json({ count });
});

router.get('/dentists/count', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  const count = await require('../models/Dentist').countDocuments();
  res.json({ count });
});

router.get('/appointments/count', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  const count = await require('../models/Appointment').countDocuments();
  res.json({ count });
}) 




module.exports = router;
