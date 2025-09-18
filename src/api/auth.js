import express from 'express';
const router = express.Router();

// Simple session storage (replace with proper auth in production)
let sessions = new Map();

// Mock login (for demo purposes)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple validation (implement proper auth)
  if (email && password) {
    const sessionId = `session_${Date.now()}`;
    sessions.set(sessionId, { email, loginTime: new Date() });
    
    res.json({
      success: true,
      sessionId,
      user: { email }
    });
  } else {
    res.status(400).json({ error: 'Email and password required' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  const { sessionId } = req.body;
  sessions.delete(sessionId);
  res.json({ success: true });
});

// Check session
router.get('/me', (req, res) => {
  const sessionId = req.headers.authorization?.replace('Bearer ', '');
  const session = sessions.get(sessionId);
  
  if (session) {
    res.json({ success: true, user: { email: session.email } });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

export default router;
