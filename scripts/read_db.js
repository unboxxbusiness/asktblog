const { createClient } = require('@libsql/client');

const dbUrl = "libsql://askt-theaskt.aws-ap-south-1.turso.io";
const dbToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODM3NDcxNTgsImlkIjoiMDE5ZjQ1NGYtODMwMS03ZDAzLWIzMjktNTNiMzhmN2YxYWE5Iiwia2lkIjoiX1NrZXd2aHdlVmI1TE94YUVqN19ySTVJeWk1ai10OEl0NkZhblIwMTJMNCIsInJpZCI6IjFiY2JmMDEyLWRkYjctNDk3OS04NDliLWY5ZDhkOTRlZTU5NiJ9.xUEain_jB5wxI1KC0BZ8ZCbppajZKfypBAiXgma3Ri2kbaA18McWAOTxY9I0imm8JWW7axR1jRW7pURGJdIaDA";

async function main() {
  const client = createClient({ url: dbUrl, authToken: dbToken });
  try {
    const result = await client.execute({
      sql: "SELECT content FROM articles WHERE slug = ?",
      args: ["geo-vs-seo-rank-in-ai-search-engines-in-2026"]
    });
    if (result.rows.length > 0) {
      const content = result.rows[0].content;
      console.log("VERIFICATION RESULT:");
      console.log("flowchart TD exists in DB:", content.includes("flowchart TD"));
      console.log("flowchart LR exists in DB:", content.includes("flowchart LR"));
    } else {
      console.log("VERIFICATION RESULT: Slug not found in database.");
    }
  } catch (e) {
    console.error("Database query failed:", e.message);
  } finally {
    client.close();
  }
}
main();
