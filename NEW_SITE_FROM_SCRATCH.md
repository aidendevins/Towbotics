# How to Build a New Site the Same Way as TowBotics

Use this checklist to spin up a new website with the **exact same stack and process**: React + Vite frontend, Express backend, Tailwind, Vercel + Railway, then customize.

---

## Phase 1: New repo and “starter” base

### Step 1: Create a new GitHub repository

1. Go to [GitHub](https://github.com/new).
2. Create a **new repository** (e.g. `my-new-site`).
   - **Do not** add a README, .gitignore, or license (you’ll bring in the starter structure).
3. Copy the repo URL (e.g. `https://github.com/yourusername/my-new-site.git`).

### Step 2: Get the starter structure onto your machine

**Option A – Copy from TowBotics (recommended)**  
Use TowBotics as the template so you keep the same layout and config:

```bash
# Clone TowBotics (if you don’t have it)
git clone https://github.com/aidendevins/Towbotics.git towbotics-template
cd towbotics-template

# Create a new folder for your new site (sibling to towbotics-template)
cd ..
mkdir my-new-site
cd my-new-site

# Copy the structure (excluding .git and heavy/unnecessary files)
cp -R ../towbotics-template/backend .
cp -R ../towbotics-template/frontend .
cp ../towbotics-template/.gitignore . 2>/dev/null || true
cp ../towbotics-template/README.md . 2>/dev/null || true
```

Then **initialize git and point at your new repo**:

```bash
git init
git remote add origin https://github.com/yourusername/my-new-site.git
```

**Option B – Use a public fullstack starter**  
If you prefer a generic starter:

1. Find a “React + Vite + Express” starter (e.g. on GitHub).
2. Clone it into a folder named after your project.
3. `git remote set-url origin https://github.com/yourusername/my-new-site.git` (after adding the remote).

Either way, you should end with a repo that has at least:

- `backend/` (Express, `routes/api.js`, `server.js`, `package.json`)
- `frontend/` (Vite + React, `src/App.jsx`, `src/main.jsx`, Tailwind, `package.json`)

---

## Phase 2: Make it “your” project (rename and env)

### Step 3: Rename the project in config

- **frontend/package.json**  
  Change `"name"` from `"starter-frontend"` (or whatever) to something like `"my-new-site-frontend"`.
- **backend/package.json**  
  Change `"name"` to e.g. `"my-new-site-backend"`.
- **frontend/index.html**  
  Update `<title>` and any meta description to your site name.

### Step 4: Set up environment files

```bash
# Backend
cp backend/env.example backend/.env
# Edit backend/.env: PORT=8000, NODE_ENV=development, FRONTEND_URL=http://localhost:5173

# Frontend
cp frontend/env.example frontend/.env.local
# Edit frontend/.env.local: VITE_API_URL=http://localhost:8000/api
```

---

## Phase 3: Run it locally

### Step 5: Install and run backend

```bash
cd backend
npm install
npm run dev
```

Leave this running. Backend should be at `http://localhost:8000`.

### Step 6: Install and run frontend (new terminal)

```bash
cd frontend   # from repo root
npm install
npm run dev
```

Frontend at `http://localhost:5173`. You should see the starter (or TowBotics) page.

---

## Phase 4: Customize the landing page (same way as TowBotics)

### Step 7: Design and content

- **Palette:** Pick 2–3 colors (e.g. slate + one accent like amber). Use Tailwind classes (`bg-slate-800`, `text-amber-500`, etc.).
- **Sections:** Edit `frontend/src/App.jsx` in order, top to bottom:
  - Hero (headline, subtext, primary CTA).
  - Social proof or quote.
  - Features / benefits (cards or list).
  - Product/demo (images, carousel, or video embed).
  - Pricing or “reserve” / CTA block.
  - Footer (links, copyright).
- **Assets:** Put images in `frontend/public/` and reference as `/your-image.png`.
- **Copy:** Replace all TowBotics text with your product/message.

### Step 8: Add a main CTA (e.g. “Reserve” or “Contact”)

- **Backend:** In `backend/routes/api.js`, add a route, e.g. `POST /api/reservation` or `POST /api/contact`, that:
  - Reads `req.body` (email, name, etc.).
  - For now can just push to an in-memory array or log; later add DB or email.
- **Frontend:** In `App.jsx`, add a form that:
  - Uses `fetch(import.meta.env.VITE_API_URL + '/reservation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })`.
  - Shows success/error state.

### Step 9: Optional – Admin dashboard (like TowBotics)

Only if you want an `/admin` with simple analytics:

- **Backend** (in `api.js`):
  - In-memory `pageViews` and `events` arrays.
  - `POST /api/analytics/view` (body: `path`, `referrer`; log IP, user-agent, timestamp).
  - `POST /api/analytics/event` (body: `eventName`, `path`; same client info).
  - `GET /api/admin/analytics` with `Authorization: Bearer YOUR_PASSWORD` → return `{ pageViews, events }`.
- **Frontend:**
  - New component `frontend/src/Admin.jsx`: login (password check), then dashboard that fetches `/admin/analytics` and shows tables/charts (e.g. Recharts).
  - In `main.jsx`: if `window.location.pathname === '/admin'` render `<Admin />`, else `<App />`.
  - In `App.jsx`: on load call `POST /api/analytics/view`; on main CTA submit call `POST /api/analytics/event` with `eventName: 'click_reserve'` (or similar).

---

## Phase 5: Deploy (Vercel + Railway)

### Step 10: Push your code

```bash
git add .
git commit -m "Initial site: React + Express starter customized for [Your Site]"
git branch -M main
git push -u origin main
```

### Step 11: Deploy backend on Railway

1. [Railway](https://railway.app) → New Project → Deploy from GitHub.
2. Select your **new repo** (`my-new-site`).
3. Set **Root Directory** to `backend`.
4. Add env vars: `PORT=8000`, `NODE_ENV=production`, `FRONTEND_URL=https://your-app.vercel.app` (you’ll set this after Vercel).
5. Deploy and copy the public URL (e.g. `https://my-new-site.up.railway.app`).

### Step 12: Deploy frontend on Vercel

1. [Vercel](https://vercel.com) → New Project → Import your **new repo**.
2. Set **Root Directory** to `frontend`.
3. Add env var: `VITE_API_URL=https://my-new-site.up.railway.app/api` (your Railway URL + `/api`).
4. Deploy and copy the Vercel URL.

### Step 13: Wire CORS and env

1. In Railway, set `FRONTEND_URL` to your **Vercel URL** (and custom domain later if you add one).
2. Ensure `backend` CORS allows that origin (e.g. in `server.js` or where CORS is set).
3. Redeploy backend if you changed env.

---

## Phase 6: Optional – Custom domain

- **Vercel:** Project → Settings → Domains → add your domain (e.g. `mynewsite.com`).
- **Railway:** Same for API subdomain if you use one (e.g. `api.mynewsite.com`).
- Update `FRONTEND_URL` and `VITE_API_URL` to use the new domains and redeploy.

---

## Quick reference: “Same process” summary

| Step | What you do |
|------|-------------|
| 1 | New GitHub repo (no README/.gitignore) |
| 2 | Get starter (copy TowBotics or clone a React+Vite+Express starter), then `git init` + `git remote add origin <new-repo-url>` |
| 3 | Rename in package.json + index.html |
| 4 | backend/.env and frontend/.env.local |
| 5–6 | `npm install` + `npm run dev` in backend and frontend |
| 7 | Edit App.jsx: hero, sections, assets, copy |
| 8 | Add one main API route (e.g. reservation) + form in App.jsx |
| 9 | (Optional) Admin + analytics routes + Admin.jsx + pathname routing |
| 10 | git add / commit / push to main |
| 11 | Railway: deploy backend, root = backend |
| 12 | Vercel: deploy frontend, root = frontend, set VITE_API_URL |
| 13 | Set FRONTEND_URL in Railway, fix CORS if needed |

That’s the same process you used for TowBotics: new repo → same stack → customize content and one main CTA → deploy → optional admin.
