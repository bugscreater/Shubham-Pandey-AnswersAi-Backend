const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  const {username,password} = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const user = await User.findOne({ username });
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  if(!user){
    const newUser = await User.create({ username,password: hashedPassword});
    return res.status(201).json({newUser});
  }
  return res.status(400).json({ message: 'User already exists.' });
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};
