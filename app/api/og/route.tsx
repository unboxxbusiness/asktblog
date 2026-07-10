import { ImageResponse } from "next/og";
import { db, articles } from "@/lib/db";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response("Missing slug parameter", { status: 400 });
    }

    // Query database for article title, category, and metadata
    const article = await db
      .select({
        title: articles.title,
        category: articles.category,
        metadata: articles.metadata,
      })
      .from(articles)
      .where(eq(articles.slug, slug))
      .get();

    if (!article) {
      return new Response("Article not found", { status: 404 });
    }

    // Parse metadata
    let metadata: Record<string, string> = {};
    if (article.metadata) {
      try {
        metadata = JSON.parse(article.metadata);
      } catch (e) {
        console.error("Failed to parse metadata in OG generator", e);
      }
    }

    // Category styling mapping for TheAskt categories
    const themes: Record<string, { bg: string; label: string; items: string[] }> = {
      "AI News": {
        bg: "rgb(99, 102, 241)",      // indigo-500
        label: "AI NEWS INTELLIGENCE BRIEFING",
        items: ["model", "release_date", "impact", "source"]
      },
      "AI Tools": {
        bg: "rgb(139, 92, 246)",      // violet-500
        label: "AI TOOL REVIEW & COMPARISON",
        items: ["best_for_coding", "best_for_speed", "best_for_reasoning", "who_should_read"]
      },
      "Automation": {
        bg: "rgb(20, 184, 166)",      // teal-500
        label: "AUTOMATION WORKFLOW GUIDE",
        items: ["tool", "use_case", "time_saved", "skill_level"]
      },
      "CRM": {
        bg: "rgb(249, 115, 22)",      // orange-500
        label: "CRM SYSTEMS & STRATEGY",
        items: ["platform", "best_for", "pricing", "integration"]
      },
      "Business Growth": {
        bg: "rgb(234, 179, 8)",       // yellow-500
        label: "BUSINESS GROWTH SIGNAL",
        items: ["strategy", "growth_rate", "target_market", "roi"]
      },
      "Career": {
        bg: "rgb(59, 130, 246)",      // blue-500
        label: "CAREER MARKET INTELLIGENCE",
        items: ["average_fresher_salary", "top_paying_industries", "growth_rate", "who_should_read"]
      },
      "Industry Insights": {
        bg: "rgb(16, 185, 129)",      // emerald-500
        label: "INDUSTRY INTELLIGENCE REPORT",
        items: ["sector", "trend", "opportunity", "risk"]
      },
      "Technology": {
        bg: "rgb(168, 85, 247)",      // purple-500
        label: "TECHNOLOGY DEEP DIVE",
        items: ["technology", "maturity", "use_cases", "adoption"]
      },
      "Education": {
        bg: "rgb(34, 197, 94)",       // green-500
        label: "LEARN AI — EDUCATION MODULE",
        items: ["skill_level", "duration", "prerequisites", "outcome"]
      },
      "Marketing": {
        bg: "rgb(239, 68, 68)",       // red-500
        label: "MARKETING & GROWTH BRIEF",
        items: ["channel", "cac", "conversion_rate", "target"]
      },
      "Productivity": {
        bg: "rgb(100, 116, 139)",     // slate-500
        label: "PRODUCTIVITY STACK REVIEW",
        items: ["tool", "time_saved", "best_for", "pricing"]
      },
    };

    const theme = themes[article.category] || {
      bg: "rgb(99, 102, 241)",
      label: "THEASKT INTELLIGENCE BRIEFING",
      items: ["who_should_read", "growth_rate", "impact"]
    };

    // Label names mapping for display in the grid
    const labelNames: Record<string, string> = {
      model: "AI MODEL",
      release_date: "RELEASE DATE",
      impact: "IMPACT LEVEL",
      source: "OFFICIAL SOURCE",
      best_for_coding: "BEST FOR CODING",
      best_for_speed: "BEST FOR SPEED",
      best_for_reasoning: "BEST FOR REASONING",
      who_should_read: "WHO SHOULD READ",
      tool: "TOOL / PLATFORM",
      use_case: "PRIMARY USE CASE",
      time_saved: "TIME SAVED",
      skill_level: "SKILL LEVEL",
      platform: "CRM PLATFORM",
      best_for: "BEST FOR",
      pricing: "PRICING",
      integration: "INTEGRATIONS",
      strategy: "KEY STRATEGY",
      growth_rate: "GROWTH RATE",
      target_market: "TARGET MARKET",
      roi: "EXPECTED ROI",
      average_fresher_salary: "STARTING SALARY",
      top_paying_industries: "TOP INDUSTRIES",
      sector: "INDUSTRY SECTOR",
      trend: "EMERGING TREND",
      opportunity: "OPPORTUNITY",
      risk: "KEY RISK",
      technology: "TECHNOLOGY",
      maturity: "MATURITY LEVEL",
      use_cases: "USE CASES",
      adoption: "ADOPTION RATE",
      duration: "COURSE DURATION",
      prerequisites: "PREREQUISITES",
      outcome: "LEARNING OUTCOME",
      channel: "MARKETING CHANNEL",
      cac: "CUSTOMER ACQ. COST",
      conversion_rate: "CONVERSION RATE",
      target: "TARGET AUDIENCE",
    };

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#030712",
            padding: "50px 60px",
            fontFamily: "sans-serif",
            position: "relative",
            justifyContent: "space-between"
          }}
        >
          {/* Ambient Glow Background — top-left */}
          <div
            style={{
              position: "absolute",
              top: "-150px",
              left: "-150px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.bg.replace(")", ", 0.15)")} 0%, rgba(3,7,18,0) 70%)`,
            }}
          />
          {/* Ambient Glow Background — bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: "-150px",
              right: "-150px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.bg.replace(")", ", 0.12)")} 0%, rgba(3,7,18,0) 70%)`,
            }}
          />

          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Brand Logo Text */}
              <span style={{ fontSize: "22px", fontWeight: "bold", color: "#ffffff", letterSpacing: "-0.5px" }}>
                The<span style={{ color: theme.bg }}>Askt</span>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: theme.bg.replace(")", ", 0.1)"),
                border: `1px solid ${theme.bg.replace(")", ", 0.2)")}`,
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#ffffff",
                letterSpacing: "1px",
              }}
            >
              {theme.label}
            </div>
          </div>

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <div
              style={{
                fontSize: "38px",
                fontWeight: "800",
                color: "#ffffff",
                lineHeight: "1.25",
                maxHeight: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "-1px"
              }}
            >
              {article.title}
            </div>
            <div style={{ fontSize: "16px", color: "#9ca3af" }}>
              Verified intelligence briefing — practical insights compiled inside.
            </div>
          </div>

          {/* Metadata Grid */}
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "20px",
              marginTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "24px",
            }}
          >
            {theme.items.map((key, idx) => {
              const val = metadata[key] || "N/A";
              const label = labelNames[key] || key.toUpperCase();
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "1",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "12px",
                    padding: "16px",
                    gap: "4px"
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: "bold", color: "#9ca3af", letterSpacing: "0.5px" }}>
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "#ffffff",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: any) {
    return new Response(`Failed to generate OG Image: ${error.message}`, { status: 500 });
  }
}
