import express from 'express';
const router = express.Router();

// In-memory storage for demo (replace with database in production)
let resumes = new Map();
let resumeCounter = 1;

// Create new resume
router.post('/create', (req, res) => {
  try {
    const { personalInfo, sections } = req.body;
    
    const resumeId = `resume_${resumeCounter++}`;
    const newResume = {
      id: resumeId,
      personalInfo: personalInfo || {},
      sections: sections || {
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    resumes.set(resumeId, newResume);
    
    res.json({
      success: true,
      data: newResume
    });
  } catch (error) {
    console.error('Resume creation error:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

// Get resume by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const resume = resumes.get(id);
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('Resume fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// Update resume
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const resume = resumes.get(id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    const updatedResume = {
      ...resume,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    resumes.set(id, updatedResume);
    
    res.json({
      success: true,
      data: updatedResume
    });
  } catch (error) {
    console.error('Resume update error:', error);
    res.status(500).json({ error: 'Failed to update resume' });
  }
});

// List all resumes (for demo purposes)
router.get('/', (req, res) => {
  try {
    const allResumes = Array.from(resumes.values()).map(resume => ({
      id: resume.id,
      personalInfo: resume.personalInfo,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt
    }));
    
    res.json({
      success: true,
      data: allResumes
    });
  } catch (error) {
    console.error('Resume list error:', error);
    res.status(500).json({ error: 'Failed to list resumes' });
  }
});

// Delete resume
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    if (!resumes.has(id)) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    resumes.delete(id);
    
    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Resume deletion error:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;
