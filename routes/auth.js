const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });

// REGISTER with image upload
router.post('/register', upload.single('image'), async (req, res) => {
    try {
      const { _id, name, email, password, role } = req.body;
  
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const imagePath = req.file ? req.file.filename : null;
  
      const newUser = new User({
        _id,
        name,
        email,
        password: hashedPassword,
        role,
        image: imagePath
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Registration failed', details: err.message });
    }
  });  

// Login user
// Login user
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // compare passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  
      // generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        'supersecretkey', // 🔐 move to .env in production
        { expiresIn: '1h' }
      );
  
      // ✅ INCLUDE USER INFO HERE
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          _id: user._id,
          name: user.name,
          role: user.role
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Login failed', details: err.message });
    }
  });  

module.exports = router;
