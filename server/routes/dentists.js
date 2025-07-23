const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDentists, addDentist } = require('../controllers/dentistController');

router.get('/', getDentists);

router.post('/', auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  next();
}, addDentist);

module.exports = router;