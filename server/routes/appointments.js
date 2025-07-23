const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getUserAppointments,
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

router.get('/', auth, getUserAppointments);
router.get('/all', auth, (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'dentist') return res.status(403).json({ msg: 'Forbidden' });
  next();
}, getAllAppointments);

router.post('/', auth, createAppointment);
router.put('/:appointmentId', auth, updateAppointment);
router.delete('/:appointmentId', auth, deleteAppointment);

router.get('/dentist/:dentistId/date/:date', auth, async (req, res) => {
  const { dentistId, date } = req.params;

  // Parse date to start and end of the day
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  try {
    const appointments = await Appointment.find({
      dentist: dentistId,
      date: { $gte: start, $lte: end },
    }).populate('user', 'name');
    console.log(appointments);
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});



module.exports = router;