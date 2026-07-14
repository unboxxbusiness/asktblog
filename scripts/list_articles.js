const { createClient } = require('@libsql/client');

const dbUrl = "libsql://askt-theaskt.aws-ap-south-1.turso.io";
const dbToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODM3NDcxNTgsImlkIjoiMDE5ZjQ1NGYtODMwMS03ZDAzLWIzMjktNTNiMzhmN2YxYWE5Iiwia2lkIjoiX1NrZXd2aHdlVmI1TE94YUVqN19ySTVJeWk1ai10OEl0NkZhblIwMTJMNCIsInJpZCI6IjFiY2JmMDEyLWRkYjctNDk3OS04NDliLWY5ZDhkOTRlZTU5NiJ9.xUEain_jB5wxI1KC0BZ8ZCbppajZKfypBAiXgma3Ri2kbaA18McWAOTxY9I0imm8JWW7axR1jRW7pURGJdIaDA";

async function main() {
  const client = createClient({ url: dbUrl, authToken: dbToken });
  try {
    const result = await client.execute("SELECT id, slug, title, category, content FROM articles");
    const output = [];
    output.push(`Found ${result.rows.length} articles:`);
    for (const row of result.rows) {
      output.push(`- [${row.category}] ${row.title} (${row.slug})`);
      const hasLR = row.content.includes("flowchart LR") || row.content.includes("graph LR");
      const hasTD = row.content.includes("flowchart TD") || row.content.includes("graph TD");
      const hasMermaid = row.content.includes("geo-mermaid");
      output.push(`  └─ Mermaid: ${hasMermaid} | LR: ${hasLR} | TD: ${hasTD}`);
    }
    const fs = require('fs');
    fs.writeFileSync('articles_list.txt', output.join('\n'), 'utf8');
    console.log("Inspection completed successfully!");
  } catch (e) {
    console.error("Failed to query articles:", e.message);
  } finally {
    client.close();
  }
}
main();
