# ClassPal — Setup and Build Guide (Same Process as TowBotics)

This guide assumes **no prior context**. Follow in order. The stack and deployment process are identical to the TowBotics project (React 18 + Vite frontend, Express backend, Tailwind, Vercel + Railway).

---

## SECTION A: Create the New Repo and Get the Starter Code

### A1. Create the GitHub repository

1. Go to https://github.com/new .
2. **Repository name:** e.g. `ClassPal` or `classpal` (your choice).
3. **Visibility:** Private or Public.
4. **Do NOT** check "Add a README file," ".gitignore," or "License" — you will bring in the starter structure.
5. Click **Create repository**.
6. Copy the repo URL (e.g. `https://github.com/YOUR_USERNAME/ClassPal.git`).

### A2. Get the TowBotics structure (your “starter”)

You will copy the TowBotics repo structure into a new folder and point that folder at your new ClassPal repo.

**On your machine:**

```bash
# 1. Navigate to where you keep projects (e.g. Documents/GitHub)
cd ~/Documents/GitHub

# 2. Clone TowBotics if you don’t already have it
git clone https://github.com/aidendevins/Towbotics.git towbotics-starter
cd towbotics-starter

# 3. Create the new project folder (sibling to towbotics-starter)
cd ..
mkdir ClassPal
cd ClassPal

# 4. Copy backend and frontend (and optional root files)
cp -R ../towbotics-starter/backend .
cp -R ../towbotics-starter/frontend .
cp ../towbotics-starter/.gitignore . 2>/dev/null || true

# 5. Optional: copy README/SETUP as a base, then you’ll overwrite
# cp ../towbotics-starter/README.md .
# cp ../towbotics-starter/SETUP.md .
```

**What you must NOT copy (so ClassPal stays clean):**

- TowBotics-specific content: replace all landing copy, images, and product-specific routes (e.g. reservation, analytics) with ClassPal equivalents or placeholders.
- Do not copy `frontend/public/` image assets that are TowBotics-specific (or copy and then replace with ClassPal assets).
- `.git` must not be copied — you will init a new git repo in ClassPal.

### A3. Initialize Git and connect to your new repo

```bash
# From inside ClassPal/
git init
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ClassPal.git
```

Replace `YOUR_USERNAME/ClassPal.git` with your actual new repo URL.

### A4. Verify structure

You should have:

```
ClassPal/
├── .git/
├── .gitignore
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── env.example
│   ├── railway.toml (optional)
│   └── routes/
│       └── api.js
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vercel.json
    ├── env.example
    ├── public/
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── index.css
```

---

## SECTION B: Rename and Configure for ClassPal

### B1. Rename the project in config files

- **frontend/package.json**  
  Set `"name": "classpal-frontend"` (or `"classpal"`).

- **backend/package.json**  
  Set `"name": "classpal-backend"`.

- **frontend/index.html**  
  Update `<title>` to e.g. `ClassPal — Teacher-first AI copilot` and any meta description.

### B2. Backend environment

```bash
cd backend
cp env.example .env
```

Edit **backend/.env** (create if missing):

```env
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Later, when you deploy, set `FRONTEND_URL` to your Vercel URL (e.g. `https://classpal.vercel.app`).

### B3. Frontend environment

```bash
# From repo root
cd frontend
cp env.example .env.local
```

Edit **frontend/.env.local**:

```env
VITE_API_URL=http://localhost:8000/api
```

In production, set `VITE_API_URL` to your Railway API URL + `/api` (e.g. `https://classpal.up.railway.app/api`).

### B4. Backend CORS

Ensure **backend/server.js** (or wherever CORS is configured) allows your frontend origin. Typical pattern:

- In development: allow `http://localhost:5173`.
- In production: allow your Vercel URL and any custom domain (e.g. `https://classpal.vercel.app`).

If the TowBotics backend uses an env var like `FRONTEND_URL`, the same pattern applies: set it per environment.

---

## SECTION C: Run Locally

### C1. Install and run backend

```bash
cd backend
npm install
npm run dev
```

Leave this terminal open. Backend should be at `http://localhost:8000`. A simple `GET /api/status` (or similar) should return OK if the backend is up.

### C2. Install and run frontend (new terminal)

```bash
cd frontend   # from repo root
npm install
npm run dev
```

Frontend should be at `http://localhost:5173`. You will see whatever is currently in `App.jsx` (initially TowBotics content until you replace it).

### C3. Quick sanity check

- Open `http://localhost:5173` — page loads.
- If the app has an API status indicator, it should show connected when the backend is running.
- Change `VITE_API_URL` to a wrong URL and refresh — status should show disconnected. Then restore and confirm again.

---

## SECTION D: Deploy (Vercel + Railway)

### D1. Commit and push

From repo root:

```bash
git add .
git commit -m "Initial ClassPal: React + Express stack from TowBotics template"
git push -u origin main
```

### D2. Deploy backend on Railway

1. Go to https://railway.app and sign in.
2. **New Project** → **Deploy from GitHub repo** → select your **ClassPal** repo.
3. Set **Root Directory** to `backend`.
4. Add environment variables:
   - `PORT` = 8000
   - `NODE_ENV` = production
   - `FRONTEND_URL` = (leave blank for now; set after Vercel deploy)
5. Deploy and wait for a public URL (e.g. `https://classpal-production.up.railway.app`). Copy this URL.

### D3. Deploy frontend on Vercel

1. Go to https://vercel.com and sign in.
2. **Add New** → **Project** → Import your **ClassPal** GitHub repo.
3. Set **Root Directory** to `frontend`.
4. Add environment variable:
   - `VITE_API_URL` = `https://YOUR_RAILWAY_URL/api` (the URL from D2 + `/api`)
5. Deploy. Copy the Vercel URL (e.g. `https://classpal.vercel.app`).

### D4. Wire backend to frontend

1. In Railway, open your backend service → **Variables**.
2. Set `FRONTEND_URL` to your Vercel URL (e.g. `https://classpal.vercel.app`).
3. Redeploy the backend if needed so CORS uses the new origin.

### D5. Optional: custom domain

- In Vercel: Project → Settings → Domains → add your domain.
- In Railway: add custom domain for API if desired.
- Update `FRONTEND_URL` and `VITE_API_URL` accordingly and redeploy.

---

## SECTION E: Phased Build Order (Simplest First)

Use this order so a new Cursor can implement features incrementally without prior context. Each phase assumes the previous one is done.

### Phase 1 — Landing and positioning (Week 1)

**Goal:** A live, teacher-facing landing page that explains ClassPal and captures interest.

- Replace all TowBotics content in **frontend/src/App.jsx** with ClassPal:
  - Hero: teacher-first positioning, “daily driver” copilot, AP/IB.
  - Value props: targeted reteach, quick checks, student recap, gentle coaching, no surveillance.
  - Clear CTA: e.g. “Join waitlist” or “Get early access.”
- Use Tailwind; keep palette professional (e.g. slate + one accent).
- Add one backend route, e.g. **POST /api/waitlist** (email + optional name), and a form in App.jsx that submits to it (same pattern as TowBotics reservation).
- Remove or repurpose TowBotics-specific routes (e.g. reservation, analytics) or keep only waitlist for now.
- Ensure **frontend/vercel.json** has a rewrite so all routes serve `index.html` (SPA). Example: `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`.

**Deliverable:** Landing page live; waitlist signups stored (in-memory or DB); CORS and env working.

### Phase 2 — Auth placeholder and “logged-in” shell (Week 2)

**Goal:** Teacher can “log in” (placeholder or simple magic link / email later) and see a minimal dashboard shell.

- Add a simple auth flow:
  - Option A: Placeholder login (e.g. email + “Continue” that sets a session/token without real email verification).
  - Option B: Integrate a simple auth provider (e.g. Clerk, Auth0) with “Login with Google” for teachers.
- Backend: **GET /api/me** (or similar) that returns current user if authenticated, 401 otherwise.
- Frontend: route or pathname check (e.g. `/dashboard`) that shows a **dashboard shell** only when “logged in”; otherwise redirect to landing or login.
- Dashboard shell: nav (e.g. “Home,” “After class,” “Settings”) and one sentence: “Your post-class outputs will appear here.” No real data yet.

**Deliverable:** Teacher can “log in” and see an empty dashboard; routing and auth contract in place.

### Phase 3 — One end-to-end wedge: “After class” output (Weeks 3–4)

**Goal:** One class session → one set of outputs (summary + objectives, student recap, 10-min reteach plan). No recording yet — use mock or manual input.

- **Backend:**
  - Data model (see Master Spec): at least **Course**, **Lesson**, **Segment** (or a single “class session” object with transcript/summary text).
  - **POST /api/lessons** (or **POST /api/sessions**): accept a minimal payload (e.g. course id, date, transcript text or summary, objectives). Store in DB or in-memory.
  - **POST /api/lessons/:id/generate** (or similar): trigger generation of:
    - Teacher summary + objectives
    - Student recap (key objectives, vocab, study tips, 3 practice prompts, textbook refs)
    - 10-minute reteach plan (targeted; two options if specified in spec)
  - For MVP, “generation” can be rule-based or call an LLM API (e.g. OpenAI) with prompts from the Master Spec artifact templates.
- **Frontend:**
  - “After class” flow: teacher selects or creates a “class session,” optionally pastes transcript/summary, clicks “Generate.”
  - Results page shows the three artifacts in the layout defined in the Master Spec (teacher summary, student recap, reteach plan).
  - Simple “Copy” or “Download” for each artifact.

**Deliverable:** One full flow from “class session” input to three generated artifacts; no recording/capture yet.

### Phase 4 — Capture ritual and real data (Weeks 5–6)

**Goal:** Teacher can indicate “class started” and attach or upload materials; system stores them and links to the lesson.

- **Backend:**
  - **POST /api/lessons** (or sessions) extended to accept: audio file URL, transcript file, or pasted transcript; course/unit/objectives; optional slides/notes attachments.
  - Store in DB with timestamps; link to generation job.
- **Frontend:**
  - “Start class” or “Log this class” screen: course select, date, optional “Upload transcript” or “Paste transcript,” optional attach slides. Submit creates the lesson/session and optionally triggers generation (or “Generate” in a second step).
- **Processing (simplified):** If you have transcript text, use it in the generation prompts. Audio processing (speaker diarization, ASR) can be a later phase; for MVP, manual paste or upload of transcript is enough.

**Deliverable:** Teacher can create a lesson with transcript/materials; generation uses that data; artifacts reference “my class.”

### Phase 5 — Exit ticket and quick check (Weeks 7–8)

**Goal:** For a given lesson, generate an exit ticket (5 questions) aligned to what was taught; teacher can run it “real-time” (end of class) or next-day warmup.

- **Backend:**
  - **POST /api/lessons/:id/exit-ticket**: generate 5 questions + answer key + misconception mapping (see Master Spec artifact template).
  - **GET /api/lessons/:id/exit-ticket**: return latest generated exit ticket.
  - Optional: **POST /api/exit-tickets/:id/responses** to store anonymous responses (for “muddiest point” and future analytics).
- **Frontend:**
  - On lesson detail/output page: “Generate exit ticket” and “View exit ticket.”
  - Display: questions, answer key, misconception mapping; option to “Use as real-time” (display for class) or “Use next day” (teacher copies or shares link).

**Deliverable:** Exit ticket generator and viewer integrated into post-class flow.

### Phase 6 — Coaching insight (opt-in, one insight) (Week 9)

**Goal:** One coaching insight per lesson: glow + grow, evidence-based, timestamp-anchored; opt-in and default to one insight.

- **Backend:**
  - Extend generation (or add **POST /api/lessons/:id/coaching**) to produce one coaching insight using the template in the Master Spec (glow + grow, evidence snippet, timestamp).
  - Store with lesson; mark “opt-in” in user preferences if needed.
- **Frontend:**
  - Settings or lesson-level toggle: “Include coaching insight.”
  - On lesson output page: show “Coaching insight” card only if opted in; display glow, grow, and evidence.

**Deliverable:** One coaching insight per lesson, opt-in, matching artifact template.

### Phase 7 — Confusion moments and time map (Weeks 10–11)

**Goal:** Artifacts “Top 3 confusion moments” and “Time map” (minutes per topic, off-track segments, engagement framing).

- **Backend:**
  - Add to generation pipeline (or separate endpoints): confusion moments (with clarifying explanations), time map (segment list with durations and labels).
  - Store with lesson.
- **Frontend:**
  - Add cards/sections to lesson output: “Confusion moments” and “Time map” with the high-fidelity layout from the Master Spec.

**Deliverable:** Confusion report and time map visible on post-class dashboard.

### Phase 8 — Assignment time estimator (Weeks 12–14)

**Goal:** Teacher uploads (or pastes) an assignment; system returns estimated completion time (p25/p50/p75), subtask breakdown, bottlenecks, levers to shorten/lengthen.

- **Backend:**
  - **POST /api/assignments/estimate**: input assignment text or file; return structure from Master Spec (p25/p50/p75, subtasks, bottlenecks, levers).
  - Can be LLM-based plus simple heuristics.
- **Frontend:**
  - “Assignment time estimator” page: upload or paste assignment; show results in the artifact template format.

**Deliverable:** Assignment time estimator flow end-to-end.

### Phase 9 — “Where did I leave off?” task state (Weeks 15–16)

**Goal:** Minimal task state: lesson prep, grading, reteach execution, objective attainment; teacher sees “where I left off” without manual project management.

- **Backend:**
  - Data model: TaskState (or status flags on Lesson, Assignment, etc.): prep status, grading status, reteach planned vs executed, objective met/partial/not met.
  - **GET /api/me/task-state**: return aggregated “what’s pending” for the teacher.
  - **PATCH /api/lessons/:id/task-state** (or similar): update status.
- **Frontend:**
  - “Where did I leave off?” dashboard or widget: list of pending items (e.g. “Plan reteach for Lesson X,” “Grade Assignment Y,” “3 objectives not yet met”). Minimal data entry; feel like an assistant.

**Deliverable:** Task state visible and updatable; teacher can see next actions.

### Phase 10 — Homework/quiz generator and talk ratio (Later)

**Goal:** Auto-generated homework/quiz aligned to AP/IB objectives with workload guardrails; teacher talk vs student talk ratio (trend view).

- Implement as per Master Spec artifact templates and data model; prioritize after core wedge and task state are stable.

### Phase 11 — Community layer (Long-term)

**Goal:** Reddit-like community: topic-indexed sharing, upvotes/comments, playbook library; suggestions only with teacher opt-in.

- Separate roadmap item; design API and UX so it does not compromise teacher-first, no-surveillance principles.

---

## SECTION F: What to Strip from TowBotics When You Copy

- **frontend/src/App.jsx:** Remove all TowBotics copy, images, reservation form, product carousel, and solution cards. Replace with ClassPal landing (hero, value props, waitlist CTA).
- **frontend/public/:** Remove TowBotics product images or replace with ClassPal assets.
- **backend/routes/api.js:** Remove or repurpose `/api/reservation` to `/api/waitlist` (or keep reservation name but change fields). Remove or repurpose `/api/analytics/*` and `/api/admin/*` unless you want an admin dashboard for ClassPal (if so, keep and rebrand).
- **frontend/src/main.jsx:** If TowBotics had `/admin` routing, either remove it or replace with a ClassPal admin route (e.g. `/dashboard`).
- **frontend/src/Admin.jsx:** Delete or replace with a ClassPal dashboard shell (Phase 2).

---

## SECTION G: Reference — TowBotics Stack Summary

| Layer      | Tech           | Dev port | Deploy        |
|-----------|----------------|----------|---------------|
| Frontend  | React 18, Vite | 5173     | Vercel        |
| Styling   | Tailwind CSS   | —        | —             |
| Backend   | Express (Node) | 8000     | Railway       |
| API base  | `/api`         | —        | Railway URL   |
| Env       | VITE_API_URL, FRONTEND_URL | — | Per platform |

Use this as the single source of truth for stack decisions when building ClassPal.
