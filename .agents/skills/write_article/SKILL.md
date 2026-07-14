---
name: write_article
description: Write and publish a premium, viral, SEO/GEO-optimized article for TheAskt using Google Trends & YouTube research data.
---

# Instructions for Drafting & Publishing Articles

Use this skill when the user asks you to write or publish a new article based on trending data.

---

## Part 1: TheAskt Brand Filter (Strict Constraint)

Do **NOT** compete with general AI news sites by writing standard announcements. Always filter stories through our brand promise:
> "How does this help someone learn AI, build skills, or create opportunities?"

- ❌ *Incorrect (standard announcement):* "OpenAI launches GPT-6"
- ✅ *Correct (TheAskt brand angle):* "GPT-6 is Here: 7 Ways Students and Professionals Can Use It to Save Time and Build Career-Ready Skills"

---

## Part 2: Read Trends Research Data

Read the local file `.agents/research/trends_research.json` to identify:
1. `top_stories`: High-virality announcements/news.
2. `youtube_trending` / `youtube_growing`: Auth references with view counts, channels, and descriptions.
3. `google_trends`: Daily search traffic query keywords.
4. `reddit_highlights`: Community topics/discussions.

Always choose the unpublished item with the highest `viral_score` that matches one of today's target categories.

---

## Part 3: Mandatory Article Structure

Every article MUST follow this exact layout within the database `content` column, containing actual technical depth, real-world statistics, and zero generic fluff:

1. **Key Takeaways (TL;DR)**: Mapped in `<div class="geo-takeaways">` (GEO block at the very beginning of the body).
2. **Authority Citations**: Mapped in `<div class="geo-citations">` containing outbound links to at least 3 high-authority original sources (GEO block).
3. **Heading Hierarchy**: Use exactly these seven H2 headings in sequence, written strictly as native HTML tags (do NOT use markdown '#' or '##' hashes):
   - `<h2>Introduction: [Topic Subtitle]</h2>`
   - `<h2>What Happened? [Context / News Update]</h2>`
   - `<h2>Why It Matters</h2>`
   - `<h2>Who Should Care?</h2>` (Followed by exactly three h3 sub-sections: `<h3>1. Students and Graduates</h3>`, `<h3>2. Freelancers and Consultants</h3>`, `<h3>3. Businesses</h3>`)
   - `<h2>How Does It Work? [Technical Details / Workflow]</h2>`
     * **For Technical Categories (AI Tools, Technology, Automation, CRM):** Include a structured code block inside `<pre><code>...</code></pre>`.
     * **For Non-Technical Categories (Marketing, Career, Business Growth, AI News, Education, Productivity):** Include a Mermaid.js diagram inside `<div class="geo-mermaid"> ... </div>`. The portal renders it automatically as a professional interactive canvas.
       - Choose the best diagram type per category:
         * `flowchart TD` — vertical top-down hierarchy by default for all flowchart paths (optimizes mobile viewport fit and layout flow)
         * `sequenceDiagram` — Automation, CRM (actor interaction / webhook flow)
         * `stateDiagram-v2` — Education (learning progression states)
       - Use node shapes for semantic clarity: `([...])` rounded for start/end, `[...]` for process, `{...}` for decision, `[(...)` for database.
       - Annotate edges with `-->|Label|` for meaningful transitions.
       - Keep focused: 4–7 nodes max.
   - `<h2>What Should You Do Next? [Actionable Learning Path]</h2>` (Must list exactly 3 numbered steps starting with "1. Step 1 (Action): ...")
   - `<h2>Final Thoughts: [Motivational Niche Subtitle]</h2>` (Must contain a brief closing and naturally weave in a link to https://theaskt.org, e.g. `<a href="https://theaskt.org">theaskt.org</a>`)
4. **Structured Q&A FAQ Block**: End the content body with exactly 6 detailed Q&As inside '<div class="geo-faq"><div class="faq-item"><h4 class="faq-question">Question?</h4><p class="faq-answer">Detailed Answer.</p></div>...</div>'.
   * IMPORTANT: The FAQ block must terminate with exactly two closing divs ('</div>\n</div>') to prevent React hydration errors. Do NOT add a third closing div.

---

## Part A: Google Antigravity 2.0 Writing Engine
* Content writing is handled directly by the built-in Google Antigravity 2.0 content generator (agentic file creation) inside workspace sessions, resolving draft creation without requiring third-party API key configurations.

---

## Part 4: Viral Headline Formulas

Choose one of these formulas to frame the article title (keep under 60 characters):
- `Google Just Released _______ — Here's What It Means for You`
- `ChatGPT Can Now _______ — 5 Ways to Use It Today`
- `This AI Tool Saved _______ Hours Per Week`
- `Students Should Learn _______ Before 2027`
- `Why Everyone Is Talking About _______`
- `The Biggest AI Update This Week: _______`
- `OpenAI Quietly Released _______ — Most People Missed It`
- `5 AI Skills That Companies Are Hiring For Right Now`
- `_______ Just Changed Everything — Here's the Breakdown`

---

## Part 5: E-E-A-T Quality Signals & Content Depth

Ensure the draft contains:
- **Author**: "TheAskt Editorial Team" (or specific expert if asked)
- **High Data Density**: Include real-world numbers, speed/pricing metrics, or model parameters (no placeholder text).
- **Citations**: Outbound links to at least 3 high-authority original sources inside the `<div class="geo-citations">` container.
- **FAQs**: Minimum of 4 detailed Q&As inside the GEO container.
- **Flowchart or Code Block**: Section 8 must strictly use either a code block (for technical) or a branching `<flowchart>` canvas (for non-technical).

---

## Part 6: Write Draft & Execute Publication

1. Save the draft inside the root folder `draft_article.json` using the following exact format:
```json
{
  "title": "Viral Headline",
  "excerpt": "Short 1-2 sentence hook summarizing the article.",
  "category": "AI Tools", // Must match siteConfig categories
  "content_type": "news", // "news" | "tutorial" | "comparison" | "tool-review" | "career"
  "image": "https://images.unsplash.com/photo-... (premium Unsplash image URL)",
  "og_image": "https://images.unsplash.com/photo-...",
  "twitter_image": "https://images.unsplash.com/photo-...",
  "author": "TheAskt Editorial Team",
  "keywords": "gpt-5, openai, ai tools, students",
  "tags": "openai,gpt-5,students,career,ai-tools",
  "featured": true,
  "viral_score": 88,
  "source_name": "OpenAI Blog",
  "source_url": "https://openai.com/blog/gpt-5",
  "research_ref": "top_stories[0]",
  "content": "Full article HTML with takeaways, citations, and FAQ blocks embedded."
}
```

2. Run the terminal command to publish the article:
```bash
pnpm publish-article
```
This inserts the record into Turso, deletes `draft_article.json`, triggers FCM notifications, pings Next.js revalidation, dispatches sitemap pings to Google & Bing, and outputs a complete console report.

---

## Part 7: Daily Category Rotation & Prompt Template

When writing, prioritize this daily rotation (but you can generate extra articles for any category at any time):

| Day | Category | Content Focus |
|:---|:---|:---|
| **Monday** | AI Tools | Tool launches, comparisons, tutorials |
| **Tuesday** | Automation | n8n / Make.com / LangChain / MCP workflows |
| **Wednesday** | CRM | CRM pipelines, HubSpot, Zoho, AI sales |
| **Thursday** | Career | AI freelancing, job market, skills, salaries |
| **Friday** | Business Growth | Revenue AI, marketing, business funnels |
| **Saturday** | AI News | Weekly releases, model releases, research |
| **Sunday** | Education | Beginner guides, student opportunities |

### Copy-Paste Prompt Template for User (Use this every day)
To draft an article, ask the user to type:
`Draft and publish a new [CATEGORY] article for TheAskt using the write_article skill.`
