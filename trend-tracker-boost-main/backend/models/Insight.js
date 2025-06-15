
const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
    title: String,
    category: String,
    date: String,
    tags: [String],
    summary: String
  });

module.exports = mongoose.models?.Insight || mongoose.model('Insight', InsightSchema);
