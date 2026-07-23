import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = val;
    }
  });
}

async function run() {
  const { getCourseSeriesGrouped } = await import("../services/articles");
  const groups = await getCourseSeriesGrouped();
  console.log("SUCCESS! Total Course Series Groups:", groups.length);
  groups.forEach((g, i) => {
    console.log(`\nGroup #${i+1}: '${g.courseTitle}' (${g.modules.length} modules, firstSlug: ${g.firstModuleSlug})`);
    g.modules.forEach(m => console.log(`   - ${m.title}`));
  });
}

run();
