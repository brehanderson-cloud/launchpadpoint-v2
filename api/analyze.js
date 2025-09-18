const express = require('express');
const AIAnalyzer = require('../utils/AIAnalyzer');
const router = express.Router();

const analyzer = new AIAnalyzer();

// Analyze job description
router.post('/job', async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const result = await analyzer.analyzeJobDescription(jobDescription);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analyze resume
router.post('/resume', async (req, res) => {
  try {
    const { resumeText } = req.body;
    const result = await analyzer.analyzeResume(resumeText);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Match qualifications
router.post('/match', async (req, res) => {
  try {
    const { resumeData, jobData } = req.body;
    const result = await analyzer.matchQualifications(resumeData, jobData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optimize resume
router.post('/optimize', async (req, res) => {
  try {
    const { resumeData, jobData, matchingResults } = req.body;
    const result = await analyzer.optimizeResume(resumeData, jobData, matchingResults);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
