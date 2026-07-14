/**
 * update_all_articles.js
 * Scans all existing articles in the Turso database and applies current settings:
 * 1. Force flowchart LR/graph LR -> flowchart TD for clean vertical layouts.
 * 2. Ensure "Final Thoughts" contains a link to theaskt.org.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');

// 1. Load Environment Variables manually to avoid dependency issues
function loadEnv() {
  const envPaths = ['.env.local', '.env'];
  for (const envFile of envPaths) {
    const fullPath = path.join(__dirname, '..', envFile);
    if (fs.existsSync(fullPath)) {
      const lines = fs.readFileSync(fullPath, 'utf8').split('\n');
      for (const line of lines) {
        // Skip comments and empty lines
        if (line.trim().startsWith('#') || !line.includes('=')) continue;
        const index = line.indexOf('=');
        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        
        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

const dbUrl = process.env.TURSO_CONNECTION_URL;
const dbToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl) {
  console.error("[!] Error: TURSO_CONNECTION_URL not found in .env or .env.local");
  process.exit(1);
}

async function runMigration() {
  console.log(`[*] Connecting to Turso database: ${dbUrl}`);
  const client = createClient({ url: dbUrl, authToken: dbToken });

  try {
    // 2. Fetch all articles
    const result = await client.execute("SELECT id, slug, title, content, category FROM articles");
    console.log(`[*] Found ${result.rows.length} articles to inspect.`);
    
    let updatedCount = 0;

    for (const article of result.rows) {
      let content = article.content;
      let isModified = false;
      const changes = [];

      // ── Step A: Force flowchart/graph LR -> flowchart TD ──
      const lrRegex = /flowchart\s+LR/gi;
      const graphLrRegex = /graph\s+LR/gi;
      
      if (lrRegex.test(content)) {
        content = content.replace(lrRegex, "flowchart TD");
        changes.push("Converted 'flowchart LR' to 'flowchart TD'");
        isModified = true;
      }
      if (graphLrRegex.test(content)) {
        content = content.replace(graphLrRegex, "flowchart TD");
        changes.push("Converted 'graph LR' to 'flowchart TD'");
        isModified = true;
      }

      // ── Step B: Ensure theaskt.org link exists in final thoughts ──
      // Check if the article contains 'theaskt.org'
      if (!content.includes("theaskt.org")) {
        // Look for the last paragraph or final thoughts section to inject the link
        const finalThoughtsHeading = /<h2>Final Thoughts<\/h2>|<h3>Final Thoughts<\/h3>/i;
        
        if (finalThoughtsHeading.test(content)) {
          // If the article has a Final Thoughts heading, append the link to the paragraph inside it
          // Find the last closing paragraph tag </p> to append the link before it
          const lastIndex = content.lastIndexOf("</p>");
          if (lastIndex !== -1) {
            const linkText = ' Study the full GEO frameworks and get monthly templates at <a href="https://theaskt.org">theaskt.org</a>.';
            content = content.slice(0, lastIndex) + linkText + content.slice(lastIndex);
            changes.push("Appended theaskt.org link to final paragraph");
            isModified = true;
          }
        } else {
          // If no specific final thoughts heading, just append a final paragraph at the end
          content += '<p>To learn more about GEO framework optimization, visit <a href="https://theaskt.org">theaskt.org</a>.</p>';
          changes.push("Appended final thoughts paragraph with theaskt.org link");
          isModified = true;
        }
      }

      // ── Step C: Update DB if changes were made ──
      if (isModified) {
        console.log(`\n[+] Updating article: "${article.title}" (${article.slug})`);
        for (const change of changes) {
          console.log(`    - ${change}`);
        }

        await client.execute({
          sql: "UPDATE articles SET content = ?, updated_at = ? WHERE id = ?",
          args: [content, Date.now(), article.id]
        });
        updatedCount++;
      }
    }

    console.log(`\n[✓] Migration completed. Total articles updated: ${updatedCount}/${result.rows.length}`);

  } catch (error) {
    console.error("[!] Migration failed:", error.message);
  } finally {
    client.close();
  }
}

runMigration();
