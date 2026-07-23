---
name: write_course_series
description: Generate and publish a 5-part interconnected micro-course series for TheAskt based on audience tracks (Students, Professionals, Daily AI Users, AI Skills, Automation Skills).
---

# Instructions for Drafting & Publishing Evergreen 5-Part Micro-Courses

> **CRITICAL REQUIREMENT**: Every article in the 5-part series MUST strictly follow the **Premium Human-Like Content Generation Framework** in `CONTENT_FRAMEWORK.md` and be published under `content_type = 'course'`.

---

## 1. Core Value Proposition
Every course generated must solve a real-world productivity problem with a clear goal:
> **"Save 5 to 10 hours of manual work every week using practical AI & Automation."**

---

## 2. Audience Track & Category Selection
Select the target track for the course series:
* 🎓 **For Students**: Active recall, exam prep, thesis research, literature review with Perplexity.
* 💼 **For Professionals**: Meeting summaries, executive reports, client onboarding, inbox zero.
* ⚡ **For Daily AI Users**: Prompt shortcuts, custom GPTs, browser AI extensions, automated file organization.
* 🚀 **For AI Skills**: Prompt engineering frameworks (CoT/Few-shot), RAG architectures, local LLMs with Ollama.
* ⚙️ **For Automation Skills**: n8n email marketing automation, Make.com CRM pipelines, Zapier AI agents.

---

## 3. The 5-Module Curriculum Structure
Generate 5 interconnected articles in sequence (each 1,000+ words):
* **Part 1: The Foundation & Trend Analysis** (Hook, trend context, why it saves 5-10 hrs/week, `<div class="geo-takeaways">`)
* **Part 2: System Architecture & Flowcharts** (Deep dive mechanics, `<div class="geo-mermaid">` 40% zoom diagram, comparison tables)
* **Part 3: Hands-On Tutorial & Tooling** (`<p>1. Step 1 (Action): ...</p>` checklist, code setup, step-by-step walkthrough)
* **Part 4: Real-World Case Study & Metrics** (Before vs After comparison table, ROI metrics, real stories)
* **Part 5: Masterclass & Future Roadmap** (Decision matrix, comprehensive `<div class="geo-faq">`, citations, course CTA)

---

## 4. Execution & Publication
1. Save the draft to `draft_course_series.json`:
```json
{
  "series_title": "How to Automate Email Marketing with n8n & AI Agents",
  "track": "Automation Skills",
  "time_savings": "Saves 10 Hours/Week",
  "articles": [
    {
      "title": "Part 1 Title...",
      "excerpt": "...",
      "category": "Course",
      "image": "https://images.unsplash.com/photo-...",
      "author": "TheAskt Desk",
      "viral_score": 98,
      "raw_body": "HTML content complying with CONTENT_FRAMEWORK.md"
    }
  ]
}
```

2. Run publication command:
```bash
python scripts/publish_course_series.py
```
This automatically links the 5 modules with header banners and course syllabus widgets, registers them under `content_type = 'course'`, and routes them exclusively to `/courses` and `/courses/[courseSlug]`.
