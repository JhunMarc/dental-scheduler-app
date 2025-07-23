// const Appointment = require('../models/Appointment');

// exports.getAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find({ user: req.user.userId }).populate('dentist').populate('user');
//     res.json(appointments);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

// exports.createAppointment = async (req, res) => {
//   const { dentistId, date } = req.body;
//   try {
//     const newAppointment = new Appointment({
//       user: req.user.userId,
//       dentist: dentistId,
//       date,
//     });
//     await newAppointment.save();
//     res.json(newAppointment);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

// exports.updateAppointment = async (req, res) => {
//   const { appointmentId } = req.params;
//   const { date, status } = req.body;
//   try {
//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

//     // Check if user owns appointment or is admin/dentist
//     if (appointment.user.toString() !== req.user.userId && req.user.role !== 'admin') {
//       return res.status(403).json({ msg: 'Not authorized' });
//     }

//     if (date) appointment.date = date;
//     if (status) appointment.status = status;

//     await appointment.save();
//     res.json(appointment);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

// exports.deleteAppointment = async (req, res) => {
//   const { appointmentId } = req.params;
//   try {
//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

//     if (appointment.user.toString() !== req.user.userId && req.user.role !== 'admin') {
//       return res.status(403).json({ msg: 'Not authorized' });
//     }

//     await appointment.remove();
//     res.json({ msg: 'Appointment canceled' });
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// }; 

// exports.getMyAppointments = async (req, res) => {
//   const appts = await Appointment.find({ user: req.user.id }).populate('dentist', 'name');
//   res.json(appts);
// };

// exports.getAllAppointments = async (req, res) => {
//   const appts = await Appointment.find().populate('dentist', 'name').populate('user', 'name');
//   res.json(appts);
// };

// exports.createAppointment = async (req, res) => {
//   const { dentistId, date } = req.body;
//   const newAppt = new Appointment({
//     user: req.user.id,
//     dentist: dentistId,
//     date,
//   });
//   await newAppt.save();
//   res.json(newAppt);
// };

// exports.updateAppointment = async (req, res) => {
//   const { appointmentId } = req.params;
//   const { date, status } = req.body;
//   const appt = await Appointment.findById(appointmentId);
//   if (!appt) return res.status(404).json({ msg: 'Not found' });
//   if (appt.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return res.status(403).json({ msg: 'Forbidden' });
//   }
//   if (date) appt.date = date;
//   if (status) appt.status = status;
//   await appt.save();
//   res.json(appt);
// };

// exports.deleteAppointment = async (req, res) => {
//   const { appointmentId } = req.params;
//   const appt = await Appointment.findById(appointmentId);
//   if (!appt) return res.status(404).json({ msg: 'Not found' });
//   if (appt.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return res.status(403).json({ msg: 'Forbidden' });
//   }
//   await appt.remove();
//   res.json({ msg: 'Cancelled' });
// };
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Dentist = require('../models/Dentist'); 
const sendEmail = require('../utils/email');

exports.getUserAppointments = async (req, res) => {
  const appointments = await Appointment.find({ user: req.user.id }).populate('dentist', 'name');
  // console.log(appointments);
  res.json(appointments);
};

exports.getAllAppointments = async (req, res) => {
  // For admin and dentist
  const appointments = await Appointment.find().populate('dentist', 'name').populate('user', 'name');
  res.json(appointments);
};

// exports.createAppointment = async (req, res) => {
//   const { dentistId, date } = req.body;
//   const newAppt = new Appointment({
//     user: req.user.id,
//     dentist: dentistId,
//     date,
//   });
//   await newAppt.save();
//   res.json(newAppt);
// }; 
exports.createAppointment = async (req, res) => {
  const { dentistId, date } = req.body;
  const newAppt = new Appointment({
    user: req.user.id,
    dentist: dentistId,
    date,
  });
  await newAppt.save();

  // Fetch user details for email
  const user = await User.findById(req.user.id);

  // Send email notification
  await sendEmail({
    to: user.email,
    subject: 'Appointment Created',
    text: `Hi ${user.name}, your appointment has been scheduled for ${new Date(date).toLocaleString()}.`,
  });

  res.json(newAppt);
};

exports.updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { date, status } = req.body;

  const appt = await Appointment.findById(appointmentId);
  if (!appt) return res.status(404).json({ msg: 'Appointment not found' });

  // Only owner or admin
  if (appt.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Forbidden' });
  }

  if (date) appt.date = date;
  if (status) appt.status = status;

  await appt.save();

  const user = await User.findById(req.user.id);
  await sendEmail({
    to: user.email,
    subject: 'Appointment Updated',
    text: `Hi ${user.name}, your appointment has been rescheduled to ${new Date(appt.date).toLocaleString()}.`,
  });


  res.json(appt);
};

exports.deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  console.log(appointmentId);
  const appt = await Appointment.findById(appointmentId);
  console.log('123'+ appt);
  if (!appt) return res.status(404).json({ msg: 'Appointment not found' });

  if (appt.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Forbidden' });
  }

  await Appointment.deleteOne({ _id: appointmentId });

  const user = await User.findById(req.user.id);
  await sendEmail({
    to: user.email,
    subject: 'Appointment Canceled',
    text: `Hi ${user.name}, your appointment scheduled for ${new Date(appt.date).toLocaleString()} has been canceled.`,
  });
  
  res.json({ msg: 'Appointment canceled' });
  // res.json({ msg: 'Appointment canceled' });
};