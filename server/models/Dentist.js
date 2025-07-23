const mongoose = require('mongoose');

// const DentistSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   specialization: {String },
//   availableSlots: [Date]
// });
// const DentistSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   specialization: { type: String },
// }, { timestamps: true });

const DentistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Dentist', DentistSchema);