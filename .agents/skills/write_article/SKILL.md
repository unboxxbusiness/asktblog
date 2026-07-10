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

Every article MUST follow this exact 13-section layout within the database `content` column:

1. **Viral Headline** (formulas below)
2. **Key Takeaways (TL;DR)**: Mapped in `<div class="geo-takeaways">` (GEO block)
3. **What Happened?**: Clear timeline and details of the news/announcement
4. **Why It Matters?**: Context and significance
5. **Who Should Care?**: Mapped by audience (Students, Freelancers, Businesses)
6. **Career Impact**: Specific career paths, opportunities, or skills to learn
7. **Business Impact**: How businesses can deploy this to cut costs or grow
8. **How Does It Work?**: Technical explainer with comparisons, pros/cons, and a detailed HTML Table
9. **What Should You Do Next?**: A step-by-step action plan for readers
10. **Expert Take**: Highlighted quote block (`<blockquote>`) giving a professional assessment
11. **Resources & Citations**: Mapped in `<div class="geo-citations">` referencing original URLs (GEO block)
12. **Frequently Asked Questions**: Mapped in `<div class="geo-faq">` containing at least 5 structured Q&As (GEO block)
13. **Sources**: Links to the original blogs, papers, or YouTube references used

---

## Part 4: Viral Headline Formulas

Choose one of these formulas to frame the article title:
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

## Part 5: E-E-A-T Quality Signals

Ensure the draft contains:
- **Author**: "TheAskt Editorial Team" (or specific expert if asked)
- **Citations**: Outbound links to at least 3 high-authority original sources (e.g. OpenAI blog, Google AI Blog, or verified YouTube channel)
- **FAQs**: Minimum of 5 detailed Q&As inside the GEO container
- **HTML Table**: High-quality comparison tables or parameter breakdowns inside section 8

---

## Part 6: Write Draft & Execute Publication

1. Save the draft inside `scripts/draft_article.json` using the following exact format:
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
  "content": "Full article HTML with <div class=\"geo-takeaways\">, <div class=\"geo-citations\">, and <div class=\"geo-faq\"> embedded."
}
```

2. Run the terminal command to publish the article:
```bash
pnpm publish-article
```
This inserts the record into Turso, triggers FCM notifications, pings Next.js revalidation, dispatches sitemap pings to Google & Bing, and outputs a complete console report.

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
