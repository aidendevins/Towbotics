const express = require('express');
const router = express.Router();

// In-memory analytics store (resets on server restart; use DB in production)
const pageViews = [];
const events = [];

const getClientInfo = (req) => ({
  ip: req.ip || req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.connection?.remoteAddress || 'unknown',
  userAgent: req.headers['user-agent'] || '',
  timestamp: new Date().toISOString()
});

// Log page view (called by frontend on load)
router.post('/analytics/view', (req, res) => {
  const { path = '/', referrer = '' } = req.body || {};
  const info = getClientInfo(req);
  pageViews.push({ path, referrer, ...info });
  res.json({ ok: true });
});

// Log event (e.g. click_reserve)
router.post('/analytics/event', (req, res) => {
  const { eventName, path = '/', ...rest } = req.body || {};
  const info = getClientInfo(req);
  events.push({ eventName, path, ...rest, ...info });
  res.json({ ok: true });
});

// Admin: get all analytics (password protected)
router.get('/admin/analytics', (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ pageViews, events });
});

// Welcome endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Towbotics API!',
    version: '1.0.0',
    endpoints: {
      status: 'GET /api/status',
      contact: 'POST /api/contact',
      reservation: 'POST /api/reservation'
    }
  });
});

// Status endpoint
router.get('/status', (req, res) => {
  res.json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Contact form endpoint
router.post('/contact', (req, res) => {
  const { name, email, company, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Name, email, and message are required'
    });
  }

  // TODO: In production, send email or save to database
  console.log('Contact form submission:', { name, email, company, message });
  
  res.json({
    success: true,
    message: 'Thank you for your interest! We will contact you soon.',
    timestamp: new Date().toISOString()
  });
});

// Demo request endpoint
router.post('/demo', (req, res) => {
  const { name, email, company, phone } = req.body;
  
  // Basic validation
  if (!name || !email || !company) {
    return res.status(400).json({
      error: 'Name, email, and company are required'
    });
  }

  // TODO: In production, send email or save to database
  console.log('Demo request:', { name, email, company, phone });
  
  res.json({
    success: true,
    message: 'Demo request received! Our team will reach out within 24 hours.',
    timestamp: new Date().toISOString()
  });
});

// Reservation / contact endpoint (no payment — we contact them)
router.post('/reservation', (req, res) => {
  const { email, firstName, lastName, phone } = req.body;
  
  if (!email || !email.trim()) {
    return res.status(400).json({
      error: 'Email is required'
    });
  }

  // TODO: In production, save to database and add to CRM/email list
  
  console.log('Contact / reservation received:', { 
    email: email.trim(), 
    firstName: (firstName || '').trim(), 
    lastName: (lastName || '').trim(), 
    phone: (phone || '').trim(),
    timestamp: new Date().toISOString()
  });
  
  res.json({
    success: true,
    message: "Thanks! We'll be in touch soon.",
    reservationId: `RES-${Date.now()}`,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
