const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const geoip = require('geoip-lite');

const getClientInfo = (req) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.connection?.remoteAddress || 'unknown';
  const geo = geoip.lookup(ip);
  return {
    ip,
    userAgent: req.headers['user-agent'] || '',
    country: geo?.country || '',
    city: geo?.city || '',
  };
};

// Log page view (called by frontend on load)
router.post('/analytics/view', async (req, res) => {
  const { path = '/', referrer = '' } = req.body || {};
  const info = getClientInfo(req);
  
  try {
    await pool.query(
      'INSERT INTO page_views (path, referrer, ip, user_agent, country, city) VALUES ($1, $2, $3, $4, $5, $6)',
      [path, referrer, info.ip, info.userAgent, info.country, info.city]
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
      'SELECT path, referrer, ip, user_agent AS "userAgent", country, city, timestamp FROM page_views ORDER BY timestamp DESC'
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

// Admin: get blocked IPs
router.get('/admin/blocked-ips', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') return res.status(401).json({ error: 'Unauthorized' });
  try {
    const result = await pool.query('SELECT ip, note, created_at AS "createdAt" FROM blocked_ips ORDER BY created_at DESC');
    res.json({ blockedIps: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blocked IPs' });
  }
});

// Admin: block an IP
router.post('/admin/blocked-ips', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') return res.status(401).json({ error: 'Unauthorized' });
  const { ip, note = '' } = req.body;
  if (!ip) return res.status(400).json({ error: 'IP required' });
  try {
    await pool.query('INSERT INTO blocked_ips (ip, note) VALUES ($1, $2) ON CONFLICT (ip) DO NOTHING', [ip, note]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to block IP' });
  }
});

// Admin: unblock an IP
router.delete('/admin/blocked-ips/:ip', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') return res.status(401).json({ error: 'Unauthorized' });
  const ip = decodeURIComponent(req.params.ip);
  try {
    await pool.query('DELETE FROM blocked_ips WHERE ip = $1', [ip]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unblock IP' });
  }
});

// Admin: clear internal/test data from analytics
router.delete('/admin/analytics/test-data', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') return res.status(401).json({ error: 'Unauthorized' });

  // Patterns matching Railway CGNAT, localhost, and private ranges
  const internalPatterns = [
    '::1', '127.%', '10.%', '192.168.%',
    '::ffff:127.%', '::ffff:10.%', '::ffff:192.168.%',
    '::ffff:100.6%', '::ffff:100.7%', '::ffff:100.8%',
    '::ffff:100.9%', '::ffff:100.10%', '::ffff:100.11%', '::ffff:100.12%',
    '100.6%', '100.7%', '100.8%', '100.9%', '100.10%', '100.11%', '100.12%',
  ];

  const whereClauses = internalPatterns.map((_, i) => `ip LIKE $${i + 1}`).join(' OR ');

  try {
    const viewsResult = await pool.query(`DELETE FROM page_views WHERE ${whereClauses}`, internalPatterns);
    const eventsResult = await pool.query(`DELETE FROM events WHERE ${whereClauses}`, internalPatterns);
    res.json({ deleted: { pageViews: viewsResult.rowCount, events: eventsResult.rowCount } });
  } catch (err) {
    console.error('Error clearing test data:', err);
    res.status(500).json({ error: 'Failed to clear test data' });
  }
});

// Admin: get all contacts
router.get('/admin/contacts', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await pool.query(
      'SELECT id, email, first_name AS "firstName", last_name AS "lastName", phone, status, timestamp FROM contacts ORDER BY timestamp DESC'
    );
    res.json({ contacts: result.rows });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Admin: update contact status
router.patch('/admin/contacts/:id', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.params;
  const { status } = req.body;
  const allowed = ['new', 'emailed', 'complete', 'not_interested'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });

  try {
    await pool.query('UPDATE contacts SET status = $1 WHERE id = $2', [status, id]);
    res.json({ ok: true });
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Admin: delete a contact
router.delete('/admin/contacts/:id', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer 0612') return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.params;
  try {
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
