# ClassPal — Handoff Package for New Cursor

**Purpose:** This folder contains everything a new Cursor session (with no prior context) needs to build the ClassPal product and run discovery.

**How to use:**
1. Create the new GitHub repo and local project using **01-SETUP-AND-BUILD-GUIDE.md** (same fullstack process as TowBotics).
2. Use **02-PRODUCT-MASTER-SPEC.md** as the single source of truth for product: narrative, personas, features, flows, data model, MVP scope, roadmap, metrics, risks.
3. Use **03-INTERVIEW-SCRIPT-45MIN.md** when conducting teacher interviews (strict 45-min structure, validation ratings, tradeoffs, pricing).

**Stack (identical to TowBotics):**
- Frontend: React 18 + Vite, Tailwind CSS, deployed on Vercel.
- Backend: Express (Node), deployed on Railway.
- Repo layout: `frontend/` and `backend/`; env vars `VITE_API_URL` and `FRONTEND_URL`; CORS configured for frontend origin.

**Build order:** Start with the simplest tasks first (landing, auth placeholder, one core flow), then add features in the order defined in the master spec MVP scope and roadmap.

**Documents in this folder:**
- `01-SETUP-AND-BUILD-GUIDE.md` — New repo creation + step-by-step build (copy from TowBotics, env, deploy, phased task list).
- `02-PRODUCT-MASTER-SPEC.md` — Full product spec (Part 1 deliverables).
- `03-INTERVIEW-SCRIPT-45MIN.md` — 45-minute teacher interview script (Part 2).
