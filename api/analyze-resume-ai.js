require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, '../uploads/') });

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

// Upload resume and analyze
app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
  try {
    let resumeText = '';
    if (req.file && req.file.mimetype === 'application/pdf') {
      const dataBuffer = req.file.buffer || require('fs').readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      resumeText = pdfData.text;
    } else if (req.file) {
      resumeText = require('fs').readFileSync(req.file.path, 'utf8');
    }
    const jobDescription = req.body.jobDescription || '';
    // Call OpenAI for analysis
    const prompt = `Analyze this resume for the following job description. Resume: ${resumeText}\nJob Description: ${jobDescription}\nReturn a JSON with matchedSkills, missingSkills, and suggestions.`;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500
    });
    const aiText = completion.data.choices[0].message.content;
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    let result = {};
    if (jsonMatch) {
      result = JSON.parse(jsonMatch[0]);
    } else {
      result = { error: 'AI did not return JSON', raw: aiText };
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log('AI backend running');
});
