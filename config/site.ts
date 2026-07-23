export const siteConfig = {
  name: "TheAskt",
  tagline: "Learn AI. Build Skills. Create Opportunities.",
  description: "TheAskt helps students, graduates, freelancers, professionals and businesses learn practical AI, automation and business systems that create real career opportunities.",
  url: "https://theaskt.org",
  ogImage: "https://theaskt.org/og-default.jpg",
  links: {
    twitter: "https://twitter.com/theaskt",
    linkedin: "https://linkedin.com/company/theaskt",
    facebook: "https://facebook.com/theaskt",
  },
  // All valid database category values
  categories: [
    "AI News",
    "AI Tools",
    "Automation",
    "CRM",
    "Business Growth",
    "Career",
    "Industry Insights",
    "Technology",
    "Education",
    "Marketing",
    "Productivity",
  ] as const,
  // Mapping of category list for database search/query matches
  categoryMapping: {
    "ai-news": "AI News",
    "ai-tools": "AI Tools",
    "automation": "Automation",
    "crm": "CRM",
    "business-growth": "Business Growth",
    "career": "Career",
    "industry-insights": "Industry Insights",
    "technology": "Technology",
    "education": "Education",
    "marketing": "Marketing",
    "productivity": "Productivity",
    // Sub-category landing pages mapping (Resolves 404 for LearnHub Dropdowns)
    "learn-ai": "Education",
    "freelancing": "Career",
    "entrepreneurship": "Business Growth",
    "ai-workflows": "Automation",
  } as Record<string, string>,
  // LearnHub dropdown items (exactly matches requirement)
  learnHubCategories: [
    { name: "Learn AI", path: "/learn-ai", dbCategory: "Education" },
    { name: "Automation", path: "/automation", dbCategory: "Automation" },
    { name: "CRM", path: "/crm", dbCategory: "CRM" },
    { name: "Business Growth", path: "/business-growth", dbCategory: "Business Growth" },
    { name: "Career Resources", path: "/career", dbCategory: "Career" },
    { name: "Industry Insights", path: "/industry-insights", dbCategory: "Industry Insights" },
    { name: "AI Workflows", path: "/ai-workflows", dbCategory: "Automation" }, // mapped to Automation/Tech
    { name: "Freelancing", path: "/freelancing", dbCategory: "Career" },
    { name: "Entrepreneurship", path: "/entrepreneurship", dbCategory: "Business Growth" },
    { name: "Productivity", path: "/productivity", dbCategory: "Productivity" },
  ] as const,
};
