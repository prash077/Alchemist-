const express = require('express');
const router = express.Router();
const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

router.post('/', async (req, res) => {
  const { name, location, sector } = req.body;

  if (!name || !location || !sector) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const prompt = `Give top 3 competitors for ${name}, a ${sector} company located in ${location}. 
Return only a JSON array like:
[
  { "name": "Competitor A", "location": "City", "sector": "Sector", "description": "..." },
  ...
]`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You only return valid JSON arrays with no extra explanation.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0.5,
      max_tokens: 512,
    });

    const content = chatCompletion.choices[0]?.message?.content;

    // ✅ Try parsing the returned content
    let parsedInsight;
    try {
      parsedInsight = JSON.parse(content);
    } catch (e) {
      console.error('LLM did not return valid JSON:', content);
      return res.status(500).json({ error: 'LLM did not return valid JSON.' });
    }

    // ✅ Return actual array
    res.json({ insight: parsedInsight });
  } catch (error) {
    console.error('Error fetching competitors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
