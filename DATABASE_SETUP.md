# Database Setup for Analytics (Railway PostgreSQL)

Analytics now persist across backend restarts using PostgreSQL instead of in-memory storage.

---

## Setup on Railway

1. Open your **TowBotics backend** project on Railway.
2. Click **+ New** → **Database** → **Add PostgreSQL**.
3. Railway will automatically:
   - Create a PostgreSQL database
   - Add `DATABASE_URL` to your backend service's environment variables
4. Your backend will auto-redeploy and create the `page_views` and `events` tables on startup.

---

## Local development (optional)

If you want analytics to work locally:

1. **Option A:** Install PostgreSQL locally and set `DATABASE_URL` in `backend/.env`:
   ```env
   DATABASE_URL=postgresql://localhost:5432/towbotics
   ```

2. **Option B:** Skip local DB; analytics won't save locally (backend will log a warning but still run).

---

## What changed

- **Backend:** Now uses PostgreSQL (`pg` package) instead of in-memory arrays.
- **Tables:** `page_views` (path, referrer, ip, user_agent, timestamp) and `events` (event_name, path, ip, user_agent, timestamp).
- **Auto-init:** On server startup, `db.js` creates tables if they don't exist.

---

## Verify it's working

1. After Railway adds PostgreSQL and redeploys:
   - Visit your site (not /admin) to trigger a page view.
   - Go to `/admin`, log in with `0612`, and check if page views appear.
2. Redeploy or restart the backend — analytics should persist now.
