const express = require('express');
const router = express.Router();
const { pool } = require('../db');

const getClientInfo = (req) => ({
  ip: req.ip || req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.connection?.remoteAddress || 'unknown',
  userAgent: req.headers['user-agent'] || '',
});

// Log page view (called by frontend on load)
router.post('/analytics/view', async (req, res) => {
  const { path = '/', referrer = '' } = req.body || {};
  const info = getClientInfo(req);
  
  try {
    await pool.query(
      'INSERT INTO page_views (path, referrer, ip, user_agent) VALUES ($1, $2, $3, $4)',
      [path, referrer, info.ip, info.userAgent]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error('Error logging page view:', err);
    res.status(500).json({ error: 'Failed to log view' });
  }
});

// Log event (e.g. click_reserve)
router.post('/analytics/event', async (req, res) => {
  const { eventName, path = '/' } = req.body || {};
  const info = getClientInfo(req);
  
  try {
    await pool.query(
      'INSERT INTO events (event_name, path, ip, user_agent) VALUES ($1, $2, $3, $4)',
      [eventName, path, info.ip, info.userAgent]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error('Error logging event:', err);
    res.status(500).json({ error: 'Failed to log event' });
  }
});

// Admin: get all analytics (password protected)
router.get('/admin/analytics', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const viewsResult = await pool.query(
      'SELECT path, referrer, ip, user_agent AS "userAgent", timestamp FROM page_views ORDER BY timestamp DESC'
    );
    const eventsResult = await pool.query(
      'SELECT event_name AS "eventName", path, ip, user_agent AS "userAgent", timestamp FROM events ORDER BY timestamp DESC'
    );

    res.json({
      pageViews: viewsResult.rows,
      events: eventsResult.rows,
    });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
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
router.post('/reservation', async (req, res) => {
  const { email, firstName, lastName, phone } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    await pool.query(
      'INSERT INTO contacts (email, first_name, last_name, phone) VALUES ($1, $2, $3, $4)',
      [email.trim(), (firstName || '').trim(), (lastName || '').trim(), (phone || '').trim()]
    );
  } catch (err) {
    console.error('Error saving contact:', err);
  }

  res.json({
    success: true,
    message: "Thanks! We'll be in touch soon.",
    timestamp: new Date().toISOString()
  });
});

// Admin: get all contacts (password protected)
router.get('/admin/contacts', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await pool.query(
      'SELECT id, email, first_name AS "firstName", last_name AS "lastName", phone, timestamp FROM contacts ORDER BY timestamp DESC'
    );
    res.json({ contacts: result.rows });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;
