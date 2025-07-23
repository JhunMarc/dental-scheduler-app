// const Dentist = require('../models/Dentist');

// exports.getDentists = async (req, res) => {
//   res.json(await Dentist.find());
// };

// exports.addDentist = async (req, res) => {
//   const { name, specialization } = req.body;
//   const dentist = new Dentist({ name, specialization });
//   await dentist.save();
//   res.json(dentist);
// };

const Dentist = require('../models/Dentist');

exports.getDentists = async (req, res) => {
  const dentists = await Dentist.find();
  res.json(dentists);
};

exports.addDentist = async (req, res) => {
  const { name, specialization, password } = req.body;
  if (!name || !password) return res.status(400).json({ msg: 'Name and password required' });

  const existingDentist = await Dentist.findOne({ name });
  if (existingDentist) return res.status(400).json({ msg: 'Dentist already exists' });

  const newDentist = new Dentist({ name, specialization, password });
  await newDentist.save();

  res.json(newDentist);
};