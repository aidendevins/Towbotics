# Copy this into a new Cursor session (no prior context)

Use the ClassPal docs in this folder as the single source of truth. I have no prior context in this chat.

**Your task:**
1. **Create the new GitHub repo and local project** using the exact same fullstack process we used for TowBotics (React 18 + Vite frontend, Express backend, Tailwind, Vercel + Railway). Follow **01-SETUP-AND-BUILD-GUIDE.md** step by step: create the new GitHub repo, copy the TowBotics structure into a new folder (ClassPal), init git and connect to the new repo, rename for ClassPal, set up env (backend .env and frontend .env.local), run backend and frontend locally, then deploy backend on Railway and frontend on Vercel and wire CORS/env.

2. **Product and build order** are in **02-PRODUCT-MASTER-SPEC.md** (narrative, personas, feature map, flows, data model, artifact templates, MVP scope, roadmap, metrics, risks). Build in the order given in **01-SETUP-AND-BUILD-GUIDE.md** Section E (Phase 1 = landing + waitlist, Phase 2 = auth + dashboard shell, then post-class outputs, capture, exit ticket, coaching, etc.). Start with the simplest tasks first.

3. **Discovery:** When I run teacher interviews, I will use **03-INTERVIEW-SCRIPT-45MIN.md** (45-minute script with sections, validation ratings for all outputs, forced tradeoffs, pricing questions). No need to implement the script in code yet; it’s for me to run interviews.

**Stack (same as TowBotics):** Frontend: React 18, Vite, Tailwind, Vercel. Backend: Express, Node, Railway. Repo layout: `frontend/` and `backend/`. Env: `VITE_API_URL`, `FRONTEND_URL`. CORS for frontend origin.

**First concrete ask:** After creating the new ClassPal repo and copying the TowBotics structure, replace the landing page with ClassPal positioning (teacher-first AI copilot for AP/IB teachers; no surveillance; value props: targeted reteach, quick checks, student recap, gentle coaching) and add a single waitlist signup form that POSTs to the backend (e.g. POST /api/waitlist). Use the narrative and positioning from 02-PRODUCT-MASTER-SPEC.md section 1.
