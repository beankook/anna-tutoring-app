// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../middleware/upload'); // if you create upload.js in middleware folder
const bcrypt = require('bcrypt');


router.post('/', upload.single('image'), async (req, res) => {
  try {
      const { _id, name, email, password, role } = req.body;
      const imagePath = req.file ? req.file.filename : null;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ _id, name, email, password: hashedPassword, role, image: imagePath });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
      res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});
  
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching users', details: err.message });
    }
  });   

// DELETE /api/users/:id - delete a user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
});  
  
// PUT /api/users/:id - update a user
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: Number(req.params.id) }, // convert string param to Number
      updates,
      { new: true } // return the updated doc
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
});
router.get('/testping', (req, res) => {
  console.log("🚨 testping route HIT");
  res.json({ message: "Test ping works!" });
});

router.get('/profiles', async (req, res) => {
  console.log("🔍 /profiles route HIT");

  try {
    const role = req.query.role;
    console.log("💬 Incoming role from query:", role);

    if (!role || (role !== 'student' && role !== 'teacher')) {
      console.log("❌ Invalid role received");
      return res.status(400).json({ error: 'Invalid or missing role parameter' });
    }

    const oppositeRole = role === 'student' ? 'teacher' : 'student';
    console.log("🔄 Fetching users with role:", oppositeRole);

    const profiles = await User.find({ role: oppositeRole });
    console.log("✅ Found profiles:", profiles);

    res.status(200).json(profiles);
  } catch (err) {
    console.error('🔥 ERROR STACK TRACE:', err); // FULL error object
    res.status(500).json({
      error: 'Failed to fetch profiles',
      details: err.message
    });
  }
});

// GET /api/users/:id - fetch user by _id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: Number(req.params.id) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user', details: err.message });
  }
});

module.exports = router;
