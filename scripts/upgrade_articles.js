/**
 * upgrade_articles.js
 * Scans all database articles and fully restructures them to match the exact parameters
 * of the reference article (geo-vs-seo-rank-in-ai-search-engines-in-2026).
 * 
 * Flowcharts are pre-defined for known articles using Antigravity's in-built design,
 * with heading-based dynamic fallback for others.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');

function loadEnv() {
  const envPaths = ['.env.local', '.env'];
  for (const envFile of envPaths) {
    const fullPath = path.join(__dirname, '..', envFile);
    if (fs.existsSync(fullPath)) {
      const lines = fs.readFileSync(fullPath, 'utf8').split('\n');
      for (const line of lines) {
        if (line.trim().startsWith('#') || !line.includes('=')) continue;
        const index = line.indexOf('=');
        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      }
    }
  }
}

loadEnv();

const dbUrl = process.env.TURSO_CONNECTION_URL;
const dbToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl) {
  console.error("[!] Error: TURSO_CONNECTION_URL not found in env files");
  process.exit(1);
}

// ── In-Built Flowcharts designed by Antigravity ──────────────────────────────
const flowcharts = {
  // Marketing Flowchart
  "geo-vs-seo-rank-in-ai-search-engines-in-2026": `flowchart TD
  Start([🏁 Start]) --> Draft[✍️ Content Draft]
  Draft --> Audit{🔍 GEO Audit}
  Audit -->|Missing signals| Summary[📝 Add Fact-Dense Summary]
  Summary --> Citations[🔗 Add Authority Citations]
  Citations --> FAQ[❓ Add FAQ Block]
  FAQ --> Headings[🏷️ Add Semantic Headings]
  Headings --> Publish[🚀 Publish Sitemap]
  Audit -->|Passes audit| Publish
  Publish --> Crawled{🤖 AI Crawled?}
  Crawled -->|Yes| Earned([🏆 Citation Earned])
  Crawled -->|No| Strengthen[💪 Strengthen Content]
  Strengthen --> Summary
  Earned --> EndNode([🏁 End])`,

  // AI News Flowchart
  "expanding-managed-agents-gemini-api": `flowchart TD
  Start([🏁 Start]) --> Trigger[⚙️ Trigger Task]
  Trigger --> Agents[🤖 Gemini Managed Agents]
  Agents --> Remote[🌐 Remote MCP Handshake]
  Remote --> Execute[📊 Async Background Exec]
  Execute --> EndNode([🏁 End])`,

  // AI Tools Flowchart
  "gpt-56-sol-terra-luna-full-benchmark-analysis": `flowchart TD
  Start([🏁 Start]) --> Input[✍️ User Intent]
  Input --> Select{📊 Tier Selector}
  Select -->|Low Latency| Luna[🌙 Luna Tier]
  Select -->|General Coding| Terra[🌍 Terra Tier]
  Select -->|Deep Reasoning| Sol[☀️ Sol Tier]
  Luna --> Benchmark[📈 Speed Benchmarks]
  Terra --> Benchmark
  Sol --> Benchmark
  Benchmark --> EndNode([🏁 End])`
};

// Custom FAQs for different categories (minimum 5 items for search engine and AI indexing authority)
const faqs = {
  "AI News": [
    { q: "How does this news impact current AI deployment strategies?", a: "It accelerates the adoption of smaller, highly optimized models that reduce compute overhead while maintaining high reasoning accuracy." },
    { q: "What should developers do to prepare for this release?", a: "Test standard prompt contexts on the new endpoints and audit existing API wrappers for latency and token limits." },
    { q: "Will this update decrease API invocation costs?", a: "Typically yes, as newer model tiers optimize context-cache mechanics and prompt token processing to reduce overall billing rates." },
    { q: "Are there immediate security changes introduced with this release?", a: "Security wrappers are reinforced at the system prompt level, reducing prompt injection vulnerabilities and aligning outputs with safety policies." },
    { q: "When will these API endpoints become publicly available in all regions?", a: "The rollout begins immediately in primary regions and is scheduled to reach all global cloud zones within two weeks." }
  ],
  "AI Tools": [
    { q: "Which model offers the best cost-to-performance ratio?", a: "Based on benchmarks, the lightweight frontier models offer the highest accuracy per dollar for standard tasks, while reasoning models are reserved for complex math and logic." },
    { q: "Can these models be self-hosted on local infrastructure?", a: "Yes, open-weights versions can be run locally using Ollama or vLLM on standard consumer GPUs with quantization enabled." },
    { q: "How do reasoning models compare to standard predictive models?", a: "Reasoning models use internal chain-of-thought processing before emitting tokens, significantly improving accuracy on multi-step logical operations." },
    { q: "What are the latency tradeoffs when using the largest model tier?", a: "The largest tier has a higher time-to-first-token latency. For real-time applications, developers should utilize the smaller, quantized tiers." },
    { q: "Is fine-tuning supported on these newly released models?", a: "Yes, API endpoints for fine-tuning via custom datasets are available, letting you align the model output with custom brand styles." }
  ],
  "Marketing": [
    { q: "What is the timeline for seeing indexing changes after optimization?", a: "Search index updates and citation maps typically refresh in 3 to 14 days, depending on sitemap submissions and crawler frequency." },
    { q: "Do these rules apply to all generative search platforms?", a: "Yes. OpenAI, Perplexity, and Google AI Overviews all reward high fact-density, outbound references, and structured FAQs." },
    { q: "How does GEO differ from traditional search engine optimization?", a: "SEO focuses on keyword counts and backlinks to rank in lists. GEO focuses on structuring content so language models can easily parse, quote, and cite it." },
    { q: "What role do outbound authority citations play in AI search rankings?", a: "AI engines favor content that quotes primary, verifiable sources. Adding direct references increases your page's citation credibility." },
    { q: "Can a new website rank on AI engines without domain authority?", a: "Yes. AI crawlers evaluate page structure and factual density directly, allowing new sites with high-quality content to win citations immediately." }
  ],
  "Automation": [
    { q: "How do you handle API limits and webhook failures?", a: "Implement retry queues with exponential backoff and verify payload signatures to handle network limits and verify requests safely." },
    { q: "Can I connect custom databases to the workflow?", a: "Yes. Use secure database adapters or direct HTTP connections to write and fetch automation payloads in real time." },
    { q: "What is the best protocol for transferring bulk data securely?", a: "Use gRPC or standard REST endpoints secured with TLS 1.3 and JWT authorization headers to protect payloads." },
    { q: "How can I monitor automation workflows for latency bottlenecks?", a: "Configure structured telemetry logging and set up alerts for execution times that exceed your SLA threshold." },
    { q: "Are there zero-code adapters available for enterprise databases?", a: "Yes, standard platforms offer pre-built connectors for PostgreSQL, MySQL, and major cloud databases for rapid setup." }
  ],
  "default": [
    { q: "How frequently are these workflows updated?", a: "They are updated monthly to keep pace with changing API capacities and benchmark metrics." },
    { q: "Where can I find more resources on these frameworks?", a: "All templates, source code, and developer guidelines are available at theaskt.org." },
    { q: "Is there a community forum for discussing these updates?", a: "Yes, developers and strategists share benchmarks and workflow templates in the community channels at theaskt.org." },
    { q: "Are the code boilerplates free to use in commercial projects?", a: "Yes, all templates are open-source and licensed under MIT, making them fully free for commercial integrations." },
    { q: "How can I submit feedback or suggest new topics?", a: "Submit an inquiry form or open a pull request directly in our documentation repository." }
  ]
};

// Parses headings from the article content to generate a tailored flowchart
function generateCustomFlowchart(content, slug, category) {
  // 1. Check if we have a pre-defined flowchart for this slug
  // We normalize slugs slightly to match reliably
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9\-]/g, "");
  for (const key of Object.keys(flowcharts)) {
    if (normalizedSlug.includes(key.replace(/[^a-z0-9\-]/g, ""))) {
      return flowcharts[key];
    }
  }

  // 2. Heading-based parser fallback
  const h2Regex = /<h2>([^<]+)<\/h2>/gi;
  const headings = [];
  let match;
  
  while ((match = h2Regex.exec(content)) !== null) {
    const text = match[1].trim();
    const lower = text.toLowerCase();
    if (
      !text ||
      lower.includes("introduction") ||
      lower.includes("takeaways") ||
      lower.includes("faq") ||
      lower.includes("frequently asked") ||
      lower.includes("final thoughts") ||
      lower.includes("conclusion") ||
      lower.includes("how does it work") ||
      lower.includes("what happened") ||
      lower.includes("why it matters") ||
      lower.includes("who should care") ||
      lower.includes("what should you do")
    ) {
      continue;
    }
    headings.push(text);
  }

  if (headings.length >= 2) {
    let flowchart = "flowchart TD\n  Start([🏁 Start])";
    let prevNode = "Start";
    
    headings.forEach((heading, idx) => {
      let cleanText = heading
        .replace(/^\d+[\.\:\s\-]+/, "") 
        .replace(/^step\s+\d+[\.\:\s\-]+/i, "") 
        .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '') 
        .trim();
      
      if (cleanText.length > 25) {
        cleanText = cleanText.slice(0, 22) + "...";
      }
      
      const nodeName = `Step${idx}`;
      flowchart += `\n  ${nodeName}["⚙️ ${cleanText}"]`;
      flowchart += `\n  ${prevNode} --> ${nodeName}`;
      prevNode = nodeName;
    });
    
    flowchart += `\n  ${prevNode} --> EndNode([🏁 End])`;
    return flowchart;
  }

  return flowcharts["default"] || `flowchart TD
  Start([🏁 Start]) --> Setup[⚙️ Setup Workspace]
  Setup --> Run[🔄 Pipeline Processing]
  Run --> Evaluate[📊 Output Assessment]
  Evaluate --> EndNode([🏁 End])`;
}

function restructureHTML(content, slug, title, category) {
  // Strip out old structural wrappers/decorations
  let clean = content
    .replace(/<div class="geo-takeaways">[\s\S]*?<\/div>/gi, "")
    .replace(/<div class="geo-citations">[\s\S]*?<\/div>/gi, "")
    .replace(/<div class="geo-mermaid">[\s\S]*?<\/div>/gi, "")
    .replace(/<div class="geo-faq">[\s\S]*?<\/div>/gi, "")
    .replace(/<div class="faq-item">[\s\S]*?<\/div>/gi, "")
    .replace(/<div class="action-checklist">[\s\S]*?<\/div>/gi, "")
    .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, "");

  // Extract all paragraphs
  const pRegex = /<p>([\s\S]*?)<\/p>/gi;
  const paragraphs = [];
  let m;
  while ((m = pRegex.exec(clean)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, "").trim(); 
    if (text.length > 15) {
      paragraphs.push(text);
    }
  }

  const pList = paragraphs.filter(p => !p.includes("theaskt.org") && !p.toLowerCase().includes("frequently asked"));
  
  const introP   = pList[0] || `In the rapidly evolving landscape of 2026, keeping pace with updates in ${category} is essential. This article breaks down the core developments and provides an actionable implementation framework.`;
  const eventP   = pList[1] || `Recent updates reveal a major shift in how systems process data and deliver user value. Platforms are actively prioritizing structured, semantic feeds over legacy inputs.`;
  const mattersP = pList[2] || `This change matters because traditional workflows are seeing a significant decline in efficacy. Adapting early ensures you capture the highest potential referral channels.`;
  const careP    = pList[3] || `For students and professionals, mastering this shift guarantees career relevance. Businesses must audit their existing setups immediately to capture organic visibility.`;
  
  const action1  = pList[4] || `Run a comprehensive audit of your current assets to identify structural gaps.`;
  const action2  = pList[5] || `Inject clear key takeaways, verified outbound references, and structured FAQs.`;
  const action3  = pList[6] || `Submit your updated sitemaps and audit checklist to verify indexing status.`;
  
  const finalP   = pList[7] || pList[pList.length - 1] || `The transition to semantic, structured discovery is not a temporary trend. Those who adopt these framework standards early will own authority maps in 2027.`;

  // Build takeaways block
  const takeawaysBullets = [
    `Critical update targeting the latest developments in ${category}.`,
    `Structured formatting optimized for search engines and language models.`,
    `Step-by-step implementation guide to maximize structural authority.`
  ];
  const takeawaysHtml = `<div class="geo-takeaways"><ul>${takeawaysBullets.map(b => `<li><strong>${b.split(' ')[0]} ${b.split(' ')[1]}:</strong> ${b.split(' ').slice(2).join(' ')}</li>`).join('')}</ul></div>`;
  
  // Citations block
  const citationsHtml = `<div class="geo-citations"><a href="https://theaskt.org">theaskt.org Resource Hub</a><a href="https://blog.google">Google AI Blog</a></div>`;

  // Flowchart
  const flowchartDef = generateCustomFlowchart(content, slug, category);

  // FAQ block
  const items = faqs[category] || faqs["default"];
  const faqHtml = `<div class="geo-faq">${items.map(item => `
    <div class="faq-item">
      <h4 class="faq-question">${item.q}</h4>
      <p class="faq-answer">${item.a}</p>
    </div>`).join('')}</div>`;

  // Rebuild rebuilt HTML
  const rebuiltHTML = `${takeawaysHtml}
${citationsHtml}

<h2>Introduction: Understanding the Shift in ${category}</h2>
<p>${introP}</p>

<h2>What Happened? Key Structural Updates</h2>
<p>${eventP}</p>

<h2>Why It Matters</h2>
<p>${mattersP}</p>

<h2>Who Should Care?</h2>
<p>${careP}</p>

<h2>How Does It Work?</h2>
<p>Here is the step-by-step structural workflow mapping the lifecycle of this process:</p>
<div class="geo-mermaid">${flowchartDef}</div>

<h2>What Should You Do Next?</h2>
<p>1. Step 1 (Action): ${action1}</p>
<p>2. Step 2 (Action): ${action2}</p>
<p>3. Step 3 (Action): ${action3}</p>

<h2>Final Thoughts: Owning the Future of Content Delivery</h2>
<p>${finalP} Study the full frameworks and get monthly templates at <a href="https://theaskt.org">theaskt.org</a>.</p>

<h2>Frequently Asked Questions</h2>
${faqHtml}`;

  return rebuiltHTML;
}

async function upgrade() {
  console.log(`[*] Connecting to Turso database...`);
  const client = createClient({ url: dbUrl, authToken: dbToken });

  try {
    const result = await client.execute("SELECT id, slug, title, content, category FROM articles");
    console.log(`[*] Query successful. Upgrading ${result.rows.length} articles...`);
    let count = 0;

    for (const article of result.rows) {
      console.log(`[+] Restructuring article: "${article.title}" (${article.slug})`);
      const restructuredContent = restructureHTML(article.content, article.slug, article.title, article.category);

      await client.execute({
        sql: "UPDATE articles SET content = ?, updated_at = ? WHERE id = ?",
        args: [restructuredContent, Date.now(), article.id]
      });
      count++;
    }

    console.log(`\n[✓] All articles successfully restructured: ${count} modified.`);

  } catch (err) {
    console.error("[!] Upgrade failed:", err.message);
  } finally {
    client.close();
  }
}

upgrade();
