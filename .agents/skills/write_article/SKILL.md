---
name: write_article
description: Write and publish a premium, viral, SEO/GEO-optimized article for TheAskt using Google Grounding Search & YouTube Data API directly to Turso DB without requiring GitHub pushes.
---

# Simple Pure-Database Article Publishing Workflow

> **CORE PRINCIPLE**: Publishing an article writes **DIRECTLY to Turso DB** via `pnpm publish-article` (or `publish_upsert.py`) and triggers instant Next.js cache revalidation. **NO GITHUB PUSH IS REQUIRED OR NEEDED** for publishing content.

---

## Step 1: Discover Viral Topic (Google Grounding Search + YouTube API)
1. Perform Google Grounding Search (`search_web`) for today's highest trending AI, automation, CRM, or career news.
2. Query YouTube Data API v3 (`YOUTUBE_API_KEY`) to find high-view viral videos, tutorials, and community discussions.
3. Select the highest virality topic and frame it through TheAskt's brand angle:
   > *"How does this help someone learn AI, build skills, or create opportunities?"*

---

## Step 2: Write Article complying with `CONTENT_FRAMEWORK.md`
Generate the article body following the mandatory structure:
* `<div class="geo-takeaways">` Key Takeaways (TL;DR)
* `<h2>` Section headings in exact 7-part sequence
* `<h2>How Does It Work?</h2>` containing a 40% initial zoom Mermaid diagram (`<div class="geo-mermaid">`) or code block
* `<p>1. Step 1 (Action): ...</p>` 3-step action checklist
* `<div class="geo-citations">` 3+ outbound authoritative citations
* `<div class="geo-faq">` 6 detailed Q&A accordion items

---

## Step 3: Populate `draft_article.json` & Run Turso Publisher
1. Save the draft to `draft_article.json`.
2. Run the Turso DB publisher:
```bash
python scripts/publish_upsert.py
```
*(Or `pnpm publish-article`)*
3. The script automatically inserts the record into Turso DB (`content_type = 'news' / 'tutorial'`) and revalidates live URLs at `https://theaskt.org/api/revalidate`.
4. **DO NOT TRIGGER GITHUB PUSH**. The live site updates dynamically from Turso DB.
