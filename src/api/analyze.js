import express from 'express';
import pdf from 'pdf-parse';
import fs from 'fs';
import AIAnalyzer from '../utils/aiAnalyzer.js';

const router = express.Router();
const analyzer = new AIAnalyzer();

// Analyze job description
router.post('/job', async (req, res) => {
  try {
    const { jobDescription } = req.body;
    
    if (!jobDescription || jobDescription.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Job description must be at least 50 characters long' 
      });
    }

    const analysis = await analyzer.analyzeJobDescription(jobDescription);
    
    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Job analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze job description',
      details: error.message 
    });
  }
});

// Upload and analyze resume
router.post('/resume', async (req, res) => {
  try {
    const upload = req.upload.single('resume');
    
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No resume file uploaded' });
      }

      try {
        let resumeText = '';
        
        if (req.file.mimetype === 'application/pdf') {
          const dataBuffer = fs.readFileSync(req.file.path);
          const pdfData = await pdf(dataBuffer);
          resumeText = pdfData.text;
        } else {
          // Handle Word documents (basic text extraction)
          resumeText = fs.readFileSync(req.file.path, 'utf8');
        }

        const analysis = await analyzer.analyzeResume(resumeText);
        
        // Clean up uploaded file
        fs.unlinkSync(req.file.path);
        
        res.json({
          success: true,
          data: analysis,
          metadata: {
            filename: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype
          },
          timestamp: new Date().toISOString()
        });
      } catch (analysisError) {
        // Clean up file on error
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        throw analysisError;
      }
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze resume',
      details: error.message 
    });
  }
});

// Match resume against job
router.post('/match', async (req, res) => {
  try {
    const { resumeData, jobData } = req.body;
    
    if (!resumeData || !jobData) {
      return res.status(400).json({ 
        error: 'Both resume data and job data are required' 
      });
    }

    const matchingResults = await analyzer.matchQualifications(resumeData, jobData);
    const atsScore = analyzer.calculateATSScore(resumeData, jobData);
    
    res.json({
      success: true,
      data: {
        ...matchingResults,
        ats_score: atsScore
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Matching error:', error);
    res.status(500).json({ 
      error: 'Failed to match qualifications',
      details: error.message 
    });
  }
});

// Optimize resume for specific job
router.post('/optimize', async (req, res) => {
  try {
    const { resumeData, jobData, matchingResults } = req.body;
    
    if (!resumeData || !jobData) {
      return res.status(400).json({ 
        error: 'Resume data and job data are required' 
      });
    }

    const optimization = await analyzer.optimizeResume(resumeData, jobData, matchingResults);
    
    res.json({
      success: true,
      data: optimization,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Optimization error:', error);
    res.status(500).json({ 
      error: 'Failed to optimize resume',
      details: error.message 
    });
  }
});

export default router;
