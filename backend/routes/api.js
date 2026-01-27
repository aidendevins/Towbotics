const express = require('express');
const router = express.Router();

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

// Reservation endpoint
router.post('/reservation', (req, res) => {
  const { email, firstName, lastName, phone } = req.body;
  
  // Basic validation
  if (!email || !firstName || !lastName) {
    return res.status(400).json({
      error: 'Email, first name, and last name are required'
    });
  }

  // TODO: In production:
  // 1. Save to database
  // 2. Integrate Stripe for $50 payment processing
  // 3. Send confirmation email
  // 4. Add to CRM/email list
  
  console.log('Reservation received:', { 
    email, 
    firstName, 
    lastName, 
    phone,
    amount: 50,
    timestamp: new Date().toISOString()
  });
  
  res.json({
    success: true,
    message: 'Reservation received! Check your email for confirmation and next steps.',
    reservationId: `RES-${Date.now()}`,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
