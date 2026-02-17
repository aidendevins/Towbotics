const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Initialize tables on first connection
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255),
        referrer TEXT,
        ip VARCHAR(100),
        user_agent TEXT,
        timestamp TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(100),
        path VARCHAR(255),
        ip VARCHAR(100),
        user_agent TEXT,
        timestamp TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    console.log('✅ Database tables initialized');
  } catch (err) {
    console.error('Database init error:', err);
  } finally {
    client.release();
  }
}

module.exports = { pool, initDB };
