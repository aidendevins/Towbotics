const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDB } = require('./db');

const app = express();
// Railway automatically sets PORT - use it, fallback to 8000 for local dev
const PORT = process.env.PORT || 8000;

// Middleware
// CORS: allow frontend URL(s). In production you MUST set FRONTEND_URL on Railway.
const frontendUrls = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((url) => url.trim()).filter(Boolean)
  : ['http://localhost:5173'];

// Expand each URL to also allow the www / non-www counterpart automatically
const allowedOrigins = new Set();
frontendUrls.forEach((url) => {
  allowedOrigins.add(url);
  try {
    const u = new URL(url);
    if (u.hostname.startsWith('www.')) {
      allowedOrigins.add(`${u.protocol}//${u.hostname.slice(4)}${u.port ? ':' + u.port : ''}`);
    } else {
      allowedOrigins.add(`${u.protocol}//www.${u.hostname}${u.port ? ':' + u.port : ''}`);
    }
  } catch (_) {}
});

console.log('✅ Allowed CORS origins:', [...allowedOrigins]);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (health checks, Postman, server-side)
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin)) return callback(null, true);
    console.warn(`⚠️  CORS blocked origin: ${origin}`);
    // Return null (blocked) instead of throwing — avoids 500 errors
    callback(null, false);
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', require('./routes/api'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API is running!',
    docs: '/api/docs'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.FRONTEND_URL) console.warn('⚠️  FRONTEND_URL not set — CORS will block frontend requests. Set it in Railway Variables.');
    if (!process.env.DATABASE_URL) console.warn('⚠️  DATABASE_URL not set — analytics will not be saved. Add a reference from Postgres in Railway.');
  }
  if (process.env.DATABASE_URL) await initDB();
});

module.exports = app;
