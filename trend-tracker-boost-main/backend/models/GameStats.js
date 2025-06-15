
const mongoose = require('mongoose');

const GameStatsSchema = new mongoose.Schema({
  streak: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  insightsRead: { type: Number, default: 0 },
  weeklyGoal: { type: Number, default: 5 },
  weeklyProgress: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: null } // ✅ Required for streak logic
});

module.exports = mongoose.model('GameStats', GameStatsSchema);
