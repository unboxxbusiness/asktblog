# Agent Rules for TheAskt

## Category and Tag Constraints
Whenever drafting or publishing new articles, you must strictly use only the pre-existing category and tag values defined within the application configuration [`site.ts`](file:///e:/brandapp/theaskt/config/site.ts).

### Allowed Categories
Only use values from `siteConfig.categories`:
- `AI News`
- `AI Tools`
- `Automation`
- `CRM`
- `Business Growth`
- `Career`
- `Industry Insights`
- `Technology`
- `Education`
- `Marketing`
- `Productivity`

### Category Mappings
Ensure categories match the URL routing mappings in `siteConfig.categoryMapping`:
- `ai-news` -> `AI News`
- `ai-tools` -> `AI Tools`
- `automation` -> `Automation`
- `crm` -> `CRM`
- `business-growth` -> `Business Growth`
- `career` -> `Career`
- `industry-insights` -> `Industry Insights`
- `technology` -> `Technology`
- `education` -> `Education`
- `marketing` -> `Marketing`
- `productivity` -> `Productivity`
- `learn-ai` -> `Education`
- `freelancing` -> `Career`
- `entrepreneurship` -> `Business Growth`
- `ai-workflows` -> `Automation`

---

## Standard Article HTML Structure Rule
Every article published on the site MUST strictly follow the exact same HTML section sequence and heading structure, as demonstrated by the *Claude + NotebookLM* review. Do not deviate from this layout under any circumstances.

### Section Templates:
1. **Introduction**:
   `## Introduction: [Topic Description]`
   *Lead paragraph detailing the problem/opportunity.*
2. **What Happened?**:
   `## What Happened? [Context/Background]`
   *Background details of the release or workflow.*
3. **Why It Matters**:
   `## Why It Matters`
   *Why this is important and what problem it solves.*
4. **Who Should Care?**:
   `## Who Should Care?`
   *Must contain exactly three standard sub-headings structured as:*
   * `### 1. Students and Graduates` (or `### 1. Students and Academics`)
   * `### 2. Freelancers and Consultants` (or `### 2. Business Analysts` / `### 2. Business Owners`)
   * `### 3. Businesses` (or `### 3. Content Creators` / `### 3. Professionals`)
5. **How Does It Work?**:
   `## How Does It Work? [Technical Details]`
   *How to implement it, code block examples, or step-by-step mechanisms.*
6. **What Should You Do Next?**:
   `## What Should You Do Next? [Actionable Learning Path]`
   *Exactly three numbered steps to take.*
7. **Citations Container**:
   `<div class="geo-citations">...</div>`
8. **FAQ Container**:
   `<div class="geo-faq"><div class="faq-item"><h4 class="faq-question">...</h4><p class="faq-answer">...</p></div>...</div></div>`
   *Must contain exactly four detailed FAQ Q&A items, matching the depth and wordcount parameters of the first article.*

---

## SEO & Generative Engine Optimization (GEO) Rules
To ensure all articles rank highly on standard Google Search, Google AI Overviews (SGE), and RAG AI Chatbots (ChatGPT, Claude, Gemini, Perplexity), you must strictly implement the following content optimization parameters in every draft:

### 1. Key Takeaways Block (For AI Summarizers)
* Position the `<div class="geo-takeaways">` block immediately after the introductory paragraph.
* Include 3 high-impact, bulleted sentences using active voice.
* Chatbots and AI search engines prioritize pages with clean, structured summaries for query snippets.

### 2. Authority Outbound Citations (For Trust Graph Alignment)
* Insert the `<div class="geo-citations">` block at the bottom of the article.
* Every article must contain at least 2 hyperlinks to highly authoritative, relevant, and verified primary sources (e.g., official documentation, press releases, or academic papers).
* Outbound citations help search engine crawlers map the article onto trust graphs, improving domain authority.

### 3. Structured FAQ Data (For Direct Q&A Matching)
* Insert the `<div class="geo-faq">` block at the end of the page (terminating with `</div>\n</div>` for parser compatibility).
* Write EXACTLY 4 detailed question/answer sets.
* Keep the `<h4 class="faq-question">` matching conversational search queries (e.g., *"How do I adjust..."*).
* Write `<p class="faq-answer">` using concise, direct answers (ideal for chatbot snippet extraction).

### 4. Technical Fact Density & Coding Blocks
* Avoid generic fluff. Include actual technical parameters, setup details, and functional code snippets (Node.js/Python).
* LLM crawlers score articles based on technical fact density and structural value, raising the relevance ranking in developer searches.

### 5. SEO Metadata Alignment
* Fill the `metaTitle` with the focus keyword positioned at the beginning.
* Keep the `excerpt` and `metaDescription` under 160 characters, written as an action-oriented call to action.
* Include a list of comma-separated primary search terms in `keywords` and lowercase tag names in `tags`.

---

## Mandatory Code Generation & Migration Rules
1. **New Article Generation**: Every new article drafted by the agent MUST strictly query this rulebook first and copy this structure, metadata parameters, and formatting without deviation.
2. **Database Verification**: All entries in the database must be routinely verified against these structural keys. Any column content found to violate these parameters must be immediately updated.
3. **Deduplication Check**: Before drafting a new article in chat, the agent MUST inspect the live portal website (by fetching `https://theaskt.com` or its RSS feed at `https://theaskt.com/feed.xml` using `read_url_content`) to compile the list of recently published article titles and slugs. The agent MUST NOT draft or write any article whose topic, title, or slug is a duplicate or highly similar (>80% similarity) to already published articles.
