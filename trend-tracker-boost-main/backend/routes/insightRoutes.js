
const express = require('express');
const Insight = require('../models/Insight');


const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const newInsight = new Insight(req.body);
    await newInsight.save();
    res.status(201).json({ message: 'Insight saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save insight' });
  }
});

router.get('/', async (req, res) => {
    try {
      const insights = await Insight.find(); 
      res.status(200).json(insights);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch insights' });
    }
  });


  module.exports = router;

