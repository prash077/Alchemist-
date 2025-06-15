// routes/stats.js
const express = require('express');
const router = express.Router();
const GameStats = require('../models/GameStats.js');

// GET /api/stats
router.get('/', async (req, res) => {
  try {
    let stats = await GameStats.findOne();
    if (!stats) {
      stats = await GameStats.create({});
    }
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/stats/activity
router.post('/activity', async (req, res) => {
  try {
    let stats = await GameStats.findOne();
    const today = new Date().toDateString();

    if (!stats) {
      stats = await GameStats.create({
        streak: 1,
        lastActiveDate: new Date()
      });
    } else {
      const last = stats.lastActiveDate ? new Date(stats.lastActiveDate).toDateString() : null;

      if (last === today) {
        return res.json({ message: 'Already updated today', streak: stats.streak });
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (last === yesterday.toDateString()) {
        stats.streak += 1;
      } else {
        stats.streak = 1;
      }

      stats.lastActiveDate = new Date();
      await stats.save();
    }

    res.json({ message: 'Streak updated', streak: stats.streak });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
