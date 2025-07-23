// const User = require('../models/User');

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) return res.status(404).json({ msg: 'Not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ msg: 'Server' });
//   }
// };

// exports.updateProfile = async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ msg: 'Not found' });
//     if (name) user.name = name;
//     if (email) user.email = email;
//     await user.save();
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ msg: 'Server' });
//   }
// };

const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();
  res.json(user);
};