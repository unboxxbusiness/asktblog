---
name: write_course_series
description: Generate and publish the next 5-part micro-course series for TheAskt by reading the topic directly from trending_1k_course_topics.md without requiring JSON catalog files or GitHub pushes.
---

# Simple Pure-Database Markdown-Based Course Series Workflow

> **CORE MANDATE**: Pick the next course topic directly from `trending_1k_course_topics.md` in `e:/brandapp/theaskt/`. Publish **DIRECTLY to Turso DB** via `python scripts/publish_course_series.py` and trigger Next.js cache revalidation. **NO GITHUB PUSH REQUIRED**.

---

## Step 1: Read Next Topic from `trending_1k_course_topics.md`
1. Open `trending_1k_course_topics.md` located at `e:/brandapp/theaskt/trending_1k_course_topics.md`.
2. Locate the next unpublished numbered topic sequentially (Topic #1, #2, #3, #4, #5... #1000).
3. Read the exact topic title.

---

## Step 2: Generate 5-Module Curriculum (1,000+ Words Each)
Generate 5 interconnected modules complying strictly with `CONTENT_FRAMEWORK.md`:
* **Part 1: The Foundation & Trend Analysis** (Hook, trend context, why it saves 5-10 hrs/week, `<div class="geo-takeaways">`)
* **Part 2: Deep Architecture & Flowcharts** (Deep dive mechanics, `<div class="geo-mermaid">` 40% zoom diagram, comparison tables)
* **Part 3: Hands-On Tutorial & Tooling** (`<p>1. Step 1 (Action): ...</p>` checklist, code setup, step-by-step walkthrough)
* **Part 4: Real-World Case Study & Metrics** (Before vs After comparison table, ROI metrics, real stories)
* **Part 5: Masterclass & Future Roadmap** (Decision matrix, comprehensive `<div class="geo-faq">`, citations, course CTA)

---

## Step 3: Populate `draft_course_series.json` & Run Turso Publisher
1. Save the draft to `draft_course_series.json`.
2. Execute the Turso DB publisher:
```bash
python scripts/publish_course_series.py
```
3. The script automatically inserts the 5 modules into Turso DB (`content_type = 'course'`) and revalidates live URLs at `https://theaskt.org/api/revalidate`.
4. **DO NOT TRIGGER GITHUB PUSH**. The live site updates dynamically from Turso DB.
