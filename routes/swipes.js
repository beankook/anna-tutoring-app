const express = require('express');
const router = express.Router();
const Swipe = require('../models/MatchSwipe');
const User = require('../models/User');

// Save a swipe
router.post('/', async (req, res) => {
  try {
    const { fromUser, toUser, decision } = req.body;
    const newSwipe = new Swipe({ fromUser, toUser, decision });
    await newSwipe.save();
    res.status(201).json({ message: 'Swipe saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save swipe', details: err.message });
  }
});

// Get matched profiles
router.get('/matches/:userId', async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    // Find everyone this user accepted
    const accepted = await Swipe.find({ fromUser: userId, decision: 'accept' });
    const acceptedUserIds = accepted.map((s) => s.toUser);

    // Find who accepted this user back
    const mutualSwipes = await Swipe.find({
      fromUser: { $in: acceptedUserIds },
      toUser: userId,
      decision: 'accept'
    });

    const matchedUserIds = mutualSwipes.map((s) => s.fromUser);

    const matchedUsers = await User.find({ _id: { $in: matchedUserIds } });

    res.json(matchedUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch matches', details: err.message });
  }
});

module.exports = router;
