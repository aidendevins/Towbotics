# ClassPal — Product Master Spec (Builder-Friendly)

Working name: **ClassPal**. Teacher-first “daily driver” copilot for AP/IB high school teachers (general education).

---

## 1) One-Page Narrative and Positioning Statement

**ClassPal is the teacher’s copilot that turns every class into actionable next steps — without surveillance or admin theater.**

We serve AP and IB high school teachers who already use AI but find it too generic for the realities of their classroom: long-answer grading, pacing pressure, and the need for “aha moments” and synthesis, not memorization. Teachers want to know *what didn’t land*, *where students got stuck*, and *exactly what to do tomorrow* — in under 60 seconds. They do not want another dashboard for admins, another evaluation tool, or another thing that adds friction to their day.

ClassPal is **teacher-first and teacher-owned**: no admin dashboards by default, nothing shared without explicit teacher action. Capture fits existing rituals (e.g. “start when taking attendance”). Outputs are **specific to my class**: they cite my objectives, my textbook and unit, anonymized student questions, and timestamps. We deliver **action over dashboards** — targeted 10-minute reteach plans, exit tickets aligned to what was actually taught, student recaps, and one optional coaching insight (glow + grow, evidence-based, kind). We are a **personal assistant**, not an evaluation or surveillance product. Our tone and defaults make it clear: this is for the teacher, owned by the teacher, and never used against them.

---

## 2) Personas (3) + Jobs-to-be-Done Map (Top 12 Jobs)

### Persona 1 — “Pacing Paula” (AP/IB science, 5–10 years)

- Teaches AP Bio and IB Chemistry; block schedule. Cares deeply about covering exam content and student synthesis. Uses AI for lesson ideas but finds output generic. Grading and lab prep spike; hates re-teaching whole concepts when only one part didn’t land. Skeptical of anything that feels like surveillance or extra meetings.
- **Top jobs:** Get a targeted reteach plan; know what to run as a quick check; get a student recap she can post without re-writing; see where she is vs pacing without manual tracking.

### Persona 2 — “Overwhelmed Omar” (AP/IB humanities, 2–4 years)

- Teaches AP Lang and IB History. Drowning in long-answer grading and “admin theater” (SMART goals, duty, meetings). Wants one coaching insight that’s concrete and kind, not vague PD. Values “glow + grow” and evidence. Worried about student overload across classes.
- **Top jobs:** Know “where did I leave off” (grading, prep, reteach) without a project manager; get one actionable coaching insight; estimate assignment time so students aren’t overloaded; have artifacts that feel specific to his class.

### Persona 3 — “Inquiry Irene” (AP/IB science, 10+ years)

- Focuses on labs and inquiry; wants “aha moments.” Finds teacher AI weak for interactive activities and labs. Wants to share what worked with other teachers but doesn’t trust platforms that share by default. Cares about AP/IB fidelity and workload sensitivity.
- **Top jobs:** Get interactive/lab ideas that match her objectives; share techniques with peers on her terms; align what was taught to objectives and assessments without overloading students; have quick checks that are operationally easy to run.

### Jobs-to-be-Done Map (Top 12)

1. **After class:** Get a targeted 10-minute reteach plan for tomorrow based on confusion and objectives.
2. **After class:** Get an exit ticket / quick check (5 questions) aligned to what was actually taught (real-time or next-day).
3. **After class:** Get one coaching insight (opt-in): evidence-based fix + one positive (glow + grow), with timestamps.
4. **After class:** Get a student-facing recap (objectives, vocab, what to study, 3 practice prompts, textbook refs).
5. **Planning:** Know “where did I leave off” (prep, grading, reteach, objective attainment) with minimal data entry.
6. **Planning:** Estimate assignment time (p25/p50/p75, subtasks, bottlenecks, levers) and avoid student overload.
7. **During/after class:** See top confusion moments with clarifying explanations (muddiest point).
8. **After class:** See a time map (minutes per topic, off-track segments, engagement framing).
9. **Ongoing:** Get teacher summary + objectives (teacher version) tied to my course/unit/slides.
10. **Ongoing:** Generate homework/quiz questions aligned to AP/IB with workload guardrails.
11. **Reflection:** See teacher talk vs student talk ratio (trend view).
12. **Sharing (later):** Export teacher-owned PD/admin report; participate in community “what worked” on my terms.

---

## 3) Feature Map (Grouped by Usage)

### Daily driver / weekly habit

| Feature | Teacher value | Replaces | Frequency |
|--------|----------------|----------|-----------|
| Post-class output bundle (reteach + exit ticket + recap + optional coaching) | One place to get “what’s next”; under 60 sec to use | Manual notes, re-teaching whole concept, rewriting recap | Every class (or every block day) |
| Start class / capture ritual | Fits “start when taking attendance”; minimal friction | Manual logging, forgetting what was covered | Every class |
| “Where did I leave off?” task state | See prep, grading, reteach, objectives without project manager | Sticky notes, mental load | Daily / weekly |
| Exit ticket (real-time or next-day) | Quick check without operational pain | Hand-written tickets, no consistent quick checks | 2–4x per week |

### Supporting / occasional

| Feature | Teacher value | Replaces | Frequency |
|--------|----------------|----------|-----------|
| Assignment time estimator | Avoid student overload; tune assignment length | Guessing, student complaints | Per assignment (1–3x per week) |
| Confusion moments + clarifications | Targeted fix instead of full reteach | Re-teaching half the class | After tough lessons |
| Time map (minutes per topic, off-track) | Pacing awareness, engagement framing | Manual timing, gut feel | After selected lessons |
| Homework/quiz generator (AP/IB, workload guardrails) | Aligned questions without starting from scratch | Building from scratch, misalignment | 1–2x per unit |
| Talk ratio trend | Reflection on who’s talking | Manual estimate | Weekly reflection |
| PD/admin export (teacher-owned) | Share on their terms, no admin access by default | Manual reports, or nothing | Occasional (observations, portfolio) |

### Platform layer

| Feature | Teacher value | Replaces | Frequency |
|--------|----------------|----------|-----------|
| Onboarding (course, syllabus, objectives, textbook) | “Specific to my class” from day one | One-off setup | Once per course/semester |
| Interactive activity / lab builder | Inquiry + aha moments; AP/IB fidelity | Generic AI activities | Per unit or term |
| Community (playbook library, sharing) | “What actually worked” with peers; opt-in only | Forums, ad-hoc sharing | Weekly / as needed |

---

## 4) End-to-End UX Flows

### Onboarding

- **Goal:** Capture course type (AP/IB), course name, textbook (name + chapter/page convention), syllabus or pacing calendar (upload or link), learning objectives (paste or upload). Optional: connect Google Drive / LMS for materials.
- **Flow:** Sign up → “Add your first course” → course type + name → textbook + optional syllabus → objectives (paste or upload) → “Your first class” prompt (start capture or explore demo).
- **Exit:** Teacher has at least one Course with objectives and optional materials; can start “Start class” flow.

### Start class / capture ritual

- **Goal:** Minimal friction; fits “when I take attendance.”
- **Flow:** Teacher taps “Start class” (or “Log this class”) → selects Course + optional Unit/date → optional: attach transcript (paste/upload) or enable recording (future) → “Class started” confirmation. Optional: attach slides, notes, lab sheet.
- **Exit:** Lesson/Session created with timestamp and optional transcript/materials; ready for post-class processing.

### Post-class output dashboard

- **Goal:** One screen with all artifacts in under 60 seconds.
- **Flow:** After class (or after transcript is available): teacher opens “After class” or lesson detail → sees generation status → dashboard with cards: Teacher summary + objectives, Student recap, Time map, Confusion moments, Exit ticket, 10-min reteach plan, (opt-in) Coaching insight. Each card: view, copy, download. Optional: “Mark reteach planned” / “Mark executed.”
- **Exit:** Teacher has used at least one artifact (e.g. copied recap, ran exit ticket, used reteach plan).

### Real-time exit ticket mode

- **Goal:** Run 5 questions at end of class or as next-day warmup.
- **Flow:** From lesson dashboard → “Run exit ticket” → choose “Show now” (real-time: display/share link for students) or “Use tomorrow.” If real-time: teacher displays questions; students respond (anonymous optional); results summarized (e.g. correct count, muddiest point). If tomorrow: teacher gets same 5 questions + answer key to use as warmup.
- **Exit:** Exit ticket run; optional response data stored for confusion/ret each signals.

### Reteach execution and tracking

- **Goal:** Track “planned” vs “executed” without heavy project management.
- **Flow:** From reteach plan card → “Mark as planned” → (after tomorrow’s class) “Mark as executed” or “Skipped.” “Where did I leave off?” shows “Reteach planned for [Lesson X] — execute or skip.”
- **Exit:** Reteach status updated; task state reflects reality.

### Assignment time estimator flow

- **Goal:** Paste or upload assignment → get p25/p50/p75, subtasks, bottlenecks, levers.
- **Flow:** “Assignment time estimator” → paste text or upload file → Generate → Results: estimated time (range), breakdown by subtask, bottlenecks, “Levers to shorten/lengthen” (e.g. reduce reading, add scaffolding). Optional: “Consider total student load across classes.”
- **Exit:** Teacher adjusts assignment or pacing based on estimate.

### “Where did I leave off?” task state flow

- **Goal:** Single view of pending prep, grading, reteach, objectives.
- **Flow:** Teacher opens “Where did I leave off?” (or dashboard widget) → sees list: “Plan reteach for [Lesson],” “Grade [Assignment],” “Send feedback for [Assignment],” “3 objectives not yet met this unit.” Click item → go to relevant lesson/assignment or mark done. Minimal data entry; defaults from lesson/assignment metadata.
- **Exit:** Teacher has updated status or taken next action.

### Community posting / retrieval flow (long-term)

- **Goal:** Share “what worked” on teacher’s terms; discover playbooks by topic/course.
- **Flow:** **Post:** Teacher opts in → “Share to community” from a lesson or artifact → choose what to share (e.g. reteach plan, activity, explanation) → tag course/unit/concept → post. **Retrieve:** Search or browse by topic/course → view post (playbook snippet) → upvote, comment, “Use in my class” (copy or adapt). No automatic sharing; no admin access.
- **Exit:** Post public in community; other teachers can find and use it.

---

## 5) Conceptual Data Model / Objects

- **Course** — Teacher-owned; course type (AP/IB), name, textbook ref, syllabus/pacing, learning objectives, optional link to LMS/Drive.
- **Lesson** (or **Session**) — One class instance; links to Course; date, start/end time; status (captured, processing, ready); optional transcript, audio URL, attachments (slides, notes).
- **Segment** — Timestamped slice of lesson (e.g. topic, activity); used for time map and evidence.
- **Objective** — Learning objective; linked to Course; attainment status (met/partial/not met) per Lesson with optional evidence.
- **ConfusionMoment** — Top N confusion points; timestamp, snippet, clarifying explanation; linked to Lesson.
- **ExitTicket** — 5 questions + answer key + misconception mapping; linked to Lesson; optional anonymous responses.
- **ReteachPlan** — 10-minute plan; 2 options if specified; linked to Lesson; status (planned, executed, skipped).
- **CoachingInsight** — One per lesson (opt-in); glow, grow, evidence snippet, timestamp; linked to Lesson.
- **Assignment** — Teacher-created or AI-generated; linked to Course/Unit; optional rubric; for grading and time estimate.
- **TimeEstimate** — For an Assignment; p25/p50/p75, subtask breakdown, bottlenecks, levers.
- **TaskState** — Aggregated view: prep status, grading status, reteach status, objective attainment; derived from Lesson, Assignment, Objective.
- **EvidenceSnippet** — Quote or timestamp used in coaching/confusion/recap; links to Lesson/Segment.
- **CommunityPost** — Teacher-shared; topic/course/concept tags; content (reteach plan, activity, explanation); upvotes, comments; no admin access.

---

## 6) High-Fidelity Artifact Templates

### Teacher summary + objectives

- **Layout:** One card/section. Title: “Teacher summary — [Course] [Unit] [Date].”
- **Content:** 2–4 sentence summary of what was taught; bullet list of objectives (mirror slide/curriculum language); textbook chapter/page if available; “Key moments” (1–3 timestamps or evidence snippets).
- **Must include:** Course/unit/topic (AP/IB tagging); objective language from teacher’s materials; numbers where possible (e.g. “~15 min on X”).

### Student recap

- **Layout:** One card; “Student recap — share as-is or adapt.”
- **Content:** “What we did” (2–3 sentences); “Key objectives” (bullets); “Key vocab” (5–10 terms); “What to study” (3–5 items); “3 practice prompts” (e.g. AP-style); “Textbook: Ch X, p Y.”
- **Must include:** Textbook refs; objectives; optional anonymized student question (“One student asked …”).

### Time map

- **Layout:** Table or timeline. Columns: Start–End (time), Duration, Topic/label, Notes (e.g. “off-track,” “engagement,” “story”).
- **Content:** Segments with minutes per topic; highlight off-track segments; optional “engagement/story” framing.
- **Must include:** Timestamps; segment labels; off-track callouts.

### Confusion moments report

- **Layout:** “Top 3 confusion moments.” Each: timestamp, short quote/snippet, “What was unclear,” “Clarifying explanation” (2–3 sentences).
- **Must include:** Evidence (timestamp + snippet); explanation specific to content; no student identification.

### Exit ticket + answer key + misconception mapping

- **Layout:** “Exit ticket (5 questions)” — numbered questions. Separate section: “Answer key” with correct answers and brief rationale. “Misconception mapping”: per question, common wrong answer → misconception → one-line fix.
- **Must include:** Alignment to “what was actually taught”; AP/IB style if applicable; usable in &lt;60 sec (display or print).

### 10-minute reteach plan (2 options)

- **Layout:** “Option A” and “Option B.” Each: goal (1 sentence), steps (3–5), materials needed, one “check for understanding” question. Optional: “Recommended based on confusion data.”
- **Must include:** Block-schedule aware (10 min); targeted to confusion signals + objectives; cite lesson/unit.

### Coaching insight (glow + grow, timestamp evidence)

- **Layout:** One card. “Glow:” one positive (evidence-based, 1–2 sentences). “Grow:” one concrete fix (1–2 sentences) with timestamp or snippet. “Evidence:” short quote or timestamp.
- **Must include:** One insight only; kind tone; no judgment; opt-in; evidence anchored to lesson.

### Homework/quiz generator (AP/IB style) + rubric

- **Layout:** “Generated questions” — N questions with stem, options (if MCQ), rubric line. “Rubric” — criteria and points. “Workload note:” estimated time (p50) and guardrail (e.g. “Within 20 min total”).
- **Must include:** Alignment to objectives/standards; AP/IB fidelity; workload estimate and guardrail.

### Talk ratio trend view

- **Layout:** Simple trend (e.g. bar or line): teacher talk % vs student talk % over last N lessons or weeks. Optional: “Target range” band.
- **Must include:** Teacher vs student; trend over time; no evaluation framing.

### PD/admin export (teacher-owned)

- **Layout:** Exportable doc (PDF or doc): selected lessons, objectives met, artifacts (summary, reteach, etc.), no raw transcript/audio. Teacher chooses what to include and who to share with.
- **Must include:** Teacher-initiated only; no admin access by default; professional summary tone.

### Assignment time estimator output (p25/p50/p75 + levers)

- **Layout:** “Estimated completion time: p25 X min, p50 Y min, p75 Z min.” “Breakdown:” subtask list with time each. “Bottlenecks:” 1–3. “Levers to shorten/lengthen:” 2–4 concrete adjustments.
- **Must include:** Range; subtasks; levers; optional “Consider total load across classes.”

### “Where I left off” dashboard snippet

- **Layout:** List or cards. Each line: type (prep / grading / reteach / objective), label (e.g. “Plan reteach for Lesson 12”), link to lesson/assignment, optional “Mark done.”
- **Must include:** Minimal entry; assistant tone; derived from lesson/assignment/objective state.

### Community post template

- **Layout:** Title, course/unit/concept tags, body (reteach plan or activity or explanation), optional attachment/link. “What worked” framing. Upvotes, comments.
- **Must include:** Topic indexing; teacher attribution (optional); no auto-sharing.

---

## 7) MVP Scope (4-Week Build): IN vs OUT

**IN (MVP):**

- Landing page (teacher-first positioning, waitlist or early access).
- Auth placeholder or simple login (teacher identity).
- One class session → one set of outputs: teacher summary + objectives, student recap, 10-min reteach plan (2 options). Input: manual transcript paste or upload (no live recording/ASR yet).
- Exit ticket: generate 5 questions + answer key + misconception mapping for a lesson; view/copy; optional “run real-time” (display) or “use next day.”
- One coaching insight per lesson (opt-in, glow + grow, evidence); stored and displayed with lesson.
- “Where did I leave off?” minimal version: list of “plan reteach,” “grade X,” “objectives not met” derived from lessons/assignments; mark done or jump to item.
- Artifacts must cite course/unit, objectives, textbook refs when available; anchor to timestamps where possible.

**OUT (post-MVP):**

- Live recording + real-time ASR and speaker diarization (use manual transcript or upload for MVP).
- Full assignment time estimator (can be Phase 8 in build order).
- Homework/quiz generator (Phase 10).
- Talk ratio trend (Phase 10).
- PD export (Phase 10).
- Interactive activity/lab builder (later).
- Community layer (long-term).
- Admin dashboards or any non–teacher-owned sharing by default.

**Why:** Validate core wedge (post-class → actionable artifacts) and task state with minimal build; add capture and automation once teachers trust the outputs.

---

## 8) Roadmap

- **0–3 months:** MVP (landing, auth, post-class bundle, exit ticket, one coaching insight, “where did I leave off”); 20–30 teacher pilots; interview script and validation ratings; iterate on artifact quality and “specific to my class.”
- **3–6 months:** Capture ritual (upload/paste transcript; optional recording pipeline); assignment time estimator; confusion moments + time map in dashboard; homework/quiz generator (AP/IB, workload guardrails); talk ratio trend.
- **6–12 months:** Richer capture (audio, ASR, diarization); interactive activity/lab builder; PD export; community alpha (playbook library, opt-in sharing).
- **12–24 months:** Full community; institutional options that do not compromise teacher trust; scaling and reliability.

---

## 9) Metrics

- **Activation:** % signups who complete onboarding (course + objectives) and generate at least one lesson output.
- **Weekly use:** % active teachers with ≥1 “after class” flow or task-state check per week.
- **Retention:** D7, D30 “returned and used at least one artifact.”
- **Time saved:** Self-report or proxy (e.g. “reteach planned in &lt;2 min” vs manual).
- **Trust toggles:** % who opt in to coaching insight; % who use “share to community” when available.
- **Artifact “used as-is” rate:** % of recaps/reteach plans/exit tickets that teacher copies or uses without heavy editing (survey or in-app).

---

## 10) Risk Register + Mitigations

| Risk | Mitigation |
|------|-------------|
| **Privacy (audio/transcript)** | Teacher-owned only; no admin access; clear data policy; optional local processing or delete-after-use. |
| **Hallucinations (wrong objectives, wrong refs)** | Cite only provided objectives/materials; show “confidence” or “based on your upload”; allow edit before use. |
| **Friction (capture too heavy)** | Start with paste/upload; “start class” = one tap + optional attach; fit attendance ritual. |
| **Distrust (surveillance feel)** | Positioning, copy, and defaults: “your copilot”; no admin dashboard; opt-in sharing only. |
| **Student overload** | Assignment time estimator; workload guardrails on generated homework; “consider total load” in UX. |
| **Coaching feels judgmental** | One insight; glow + grow; evidence-based; opt-in; kind tone; no scores. |
| **Generic outputs** | Enforce “specific to my class”: objectives, textbook, timestamps, anonymized student refs in every artifact. |

---

End of Product Master Spec. Use with **01-SETUP-AND-BUILD-GUIDE.md** for build order and **03-INTERVIEW-SCRIPT-45MIN.md** for discovery.
