// import express from 'express';
// import axios from 'axios';

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { topic } = req.body;

//   try {
//     const response = await axios.post(
//       'https://api.groq.com/openai/v1/chat/completions',
//       {
//         model: 'llama3-70b-8192',
//         messages: [
//         {
//           role: 'system',
//           content: 'You are a startup analyst generating short, sharp, and actionable business insights.',
//         },
//         {
//           role: 'user',
//           content: `
//             Topic: "${topic}"
            
//             Summarize the key takeaways into 2 very concise bullet points in just 10 words on taking an Actionable Insight so that you startup or business wont fall back.
//             dont include Here are the 2 concise bullet points in 10 words:  
//             Focus only on the most critical insights.
//           `,
//         }
// ],
// temperature: 0.5
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     const content = response.data.choices[0]?.message?.content;
//     res.json({ insight: content });
//   } catch (error: any) {
//     if (error.response) {
//       console.error('Groq API Error Response:', error.response.status, error.response.data);
//     } else {
//       console.error('Groq API Unknown Error:', error.message);
//     }

//     res.status(500).json({ error: 'Failed to generate insight' });
//   }
// });

// export default router;

// backend/routes/actionable.js

require('dotenv').config();
const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

async function generateActionableInsight(newsContent) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant who reads startup news and gives 2-3 crisp, actionable insights for startup founders based on what they should consider, change, or plan. Format the response as bullet points.',
        },
        {
          role: 'user',
          content: `${newsContent}
          Summarize the key takeaways into 2 very concise bullet points in just 10 words on taking an Actionable Insight so that your startup or business won’t fall back.
          Don’t include: “Here are the 2 concise bullet points in 10 words:”
          Focus only on the most critical insights.`,
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0.5,
      max_tokens: 256,
    });

    const insight = chatCompletion.choices[0]?.message?.content;
    return insight || 'No actionable insight available.';
  } catch (error) {
    console.error('Error generating actionable insight:', error);
    return 'Error generating actionable insight.';
  }
}

async function fetchCompetitorSuggestions({ name, location, sector }) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a business analyst AI that helps identify competitor companies. Always respond in JSON array of 3 objects with fields: name, location, sector, description. No extra commentary or text.',
        },
        {
          role: 'user',
          content: `Give top 3 competitors for ${name}, a ${sector} company located in ${location}. Return name, location, sector, and 1-line description.`,
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 512,
    });

    const response = chatCompletion.choices[0]?.message?.content;
    return response;
  } catch (error) {
    console.error('Error fetching competitors:', error);
    return '[]';
  }
}

module.exports = {
  generateActionableInsight,
  fetchCompetitorSuggestions,
};

