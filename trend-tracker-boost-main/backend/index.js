require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const statsRoutes = require('./routes/stats');
const insightRoutes = require('./routes/insightRoutes');
const { generateActionableInsight } = require('./routes/actionable');
const competitorsRoute = require('./routes/competitors');

console.log('Loaded GROQ API Key:', process.env.GROQ_API_KEY);


const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/stats', statsRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/competitors', competitorsRoute);
app.post('/api/actionable-insight', async (req, res) => {
  const { title } = req.body; // ✅ fixed

  if (!title) {
    return res.status(400).json({ error: 'Missing news title' });
  }

  try {
    const insight = await generateActionableInsight(title);
    res.json({ insight });
  } catch (error) {
    console.error('Failed to generate insight:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Server
app.listen(5173, () => console.log('Server running on port 5173'));
