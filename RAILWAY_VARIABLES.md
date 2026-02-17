# Railway Variables — Fix “DATABASE_URL not set” and CORS

Your deploy logs show two issues. Fix them by setting variables on the **Towbotics** service (not the Postgres service).

---

## 1. Add DATABASE_URL (so analytics save)

Railway does not always inject the Postgres URL into your app. Add it manually:

1. In Railway, click your **Towbotics** service (the backend app).
2. Open the **Variables** tab.
3. Click **+ New Variable** → **Add a variable** (or **Add Reference**).
4. If you see **“Add Reference”**:
   - Choose **Reference** and select your **Postgres** service.
   - Pick the variable **DATABASE_URL**.
   - Save. Railway will copy the Postgres connection string into your Towbotics service.
5. If you don’t see “Reference”:
   - Click **+ New Variable**.
   - Name: `DATABASE_URL`.
   - Value: copy the connection string from the **Postgres** service → **Variables** (or **Connect** → “Postgres connection URL”) and paste it.
   - Save.

Redeploy the Towbotics service after adding the variable. You should see **“✅ Database tables initialized”** in the deploy logs instead of “DATABASE_URL not set”.

---

## 2. Add FRONTEND_URL (fix CORS)

CORS errors mean the backend is rejecting requests from your frontend because it doesn’t know which origin to allow.

1. Stay on your **Towbotics** service → **Variables**.
2. Click **+ New Variable**.
3. Name: `FRONTEND_URL`
4. Value: the **exact** URL where your site is served, **no trailing slash**:
   - If you use a custom domain: `https://towbotic.com`
   - If you use both www and non-www: `https://towbotic.com,https://www.towbotic.com`
   - If you use Vercel default: `https://your-project.vercel.app`
5. Save.

Redeploy the Towbotics service. After that, requests from that origin will be allowed and CORS errors should stop.

---

## 3. Redeploy

After changing variables, Railway usually redeploys automatically. If not:

- Towbotics service → **Deployments** → **⋯** → **Redeploy**.

---

## Quick checklist

| Variable        | Where to get it | Example value |
|----------------|-----------------|---------------|
| `DATABASE_URL` | Postgres service → Variables or “Add Reference” | (Railway sets this) |
| `FRONTEND_URL` | Your live site URL, no trailing slash | `https://towbotic.com` |

Once both are set and the app has redeployed, check the logs for “✅ Database tables initialized” and test the site again; analytics and API calls should work.
