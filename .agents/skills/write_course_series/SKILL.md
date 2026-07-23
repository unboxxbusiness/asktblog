---
name: write_course_series
description: Generate and publish the next 5-part micro-course series for TheAskt directly from course_topics_catalog.json whenever the user requests it.
---

# Automatic Next Course Series Publishing Workflow

Whenever the user prompts you to write or publish the next course series (e.g. *"write next course series"*, *"publish next course"*), follow this automated 5-step workflow:

---

## Step 1: Pick Next Topic from Catalog
1. Open `course_topics_catalog.json` located at the root of `e:/brandapp/theaskt/course_topics_catalog.json`.
2. Locate the first topic with `"status": "draft"`.
3. Read the `series_title`, `track`, `time_savings`, and `keywords`.

---

## Step 2: Generate 5-Module Curriculum (1,000+ Words Each)
Generate 5 interconnected modules adhering strictly to `CONTENT_FRAMEWORK.md`:
* **Part 1: The Foundation & Trend Analysis** (Hook, trend context, why it saves 5-10 hrs/week, `<div class="geo-takeaways">`)
* **Part 2: Deep Architecture & Flowcharts** (Deep dive mechanics, `<div class="geo-mermaid">` 40% zoom diagram, comparison tables)
* **Part 3: Hands-On Tutorial & Tooling** (`<p>1. Step 1 (Action): ...</p>` checklist, code setup, step-by-step walkthrough)
* **Part 4: Real-World Case Study & Metrics** (Before vs After comparison table, ROI metrics, real stories)
* **Part 5: Masterclass & Future Roadmap** (Decision matrix, comprehensive `<div class="geo-faq">`, citations, course CTA)

---

## Step 3: Populate `draft_course_series.json`
Save the generated draft to `draft_course_series.json`:
```json
{
  "series_title": "<Clean Series Title from Catalog>",
  "track": "<Track Name>",
  "time_savings": "<Saves X Hours/Week>",
  "articles": [
    {
      "title": "Part 1: The Foundation — ...",
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

---

## Step 4: Execute Turso DB Publisher
Run the Python publication script:
```bash
python scripts/publish_course_series.py
```
This automatically links the 5 modules, tags them with `series_title`, registers them under `content_type = 'course'`, and revalidates live URLs.

---

## Step 5: Update Topic Status in Catalog
Update `course_topics_catalog.json` to mark the topic as `"status": "published"`.
