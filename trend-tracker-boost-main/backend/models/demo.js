const mongoose = require('mongoose');
const GameStats = require('../models/GameStats'); // adjust path

mongoose.connect('mongodb+srv://22eg105e12:Dattu%401234@cluster0.eexvy6j.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });

GameStats.deleteMany({})
  .then(() => {
    console.log('All GameStats deleted');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error deleting stats:', err);
  });
