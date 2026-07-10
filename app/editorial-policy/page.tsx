import React from "react";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Editorial & AI Content Policy - TheAskt",
  description: "Understand our editorial standards, fact-checking processes, AI-content guidelines, and ethics.",
};

export default function EditorialPolicyPage() {
  return (
    <PolicyLayout title="Editorial Policy" lastUpdated="July 9, 2026">
      <h2 className="font-heading text-lg font-bold text-foreground mb-2">1. Editorial Principles</h2>
      <p>
        TheAskt's editorial team is guided by the following principles:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground my-2">
        <li><strong>Accuracy:</strong> We verify claims before publication wherever feasible.</li>
        <li><strong>Clarity:</strong> We write for a general audience, avoiding unnecessary jargon.</li>
        <li><strong>Usefulness:</strong> Every piece of content should help the reader do, understand, or decide something.</li>
        <li><strong>Independence:</strong> Editorial decisions are not influenced by advertisers or partners.</li>
        <li><strong>Timeliness:</strong> Given how quickly AI evolves, we prioritize keeping content current and flag outdated material where relevant.</li>
      </ul>

      <h2 className="font-heading text-lg font-bold text-foreground mt-6 mb-2">2. Content & Research Standards</h2>
      <p>
        All published content must be relevant to our core topics: AI News, AI Tools, LearnHub, Automation, CRM, Business Growth, Career Resources, and Industry Insights. 
      </p>
      <p className="mt-2">
        Our content is researched using a combination of primary sources (official documentation, company announcements, academic papers) and reputable secondary sources (established technology publications). We prioritize primary sources whenever available.
      </p>

      <h2 className="font-heading text-lg font-bold text-foreground mt-6 mb-2">3. Fact Checking</h2>
      <p>
        Where practical, claims involving statistics, pricing, product features, or capabilities are cross-checked against official or authoritative sources prior to publication. Given the volume and pace of AI-related content, not every statement can be independently verified in real time; we rely on our Corrections Policy as a safety net for catching and fixing errors after publication.
      </p>

      <h2 className="font-heading text-lg font-bold text-foreground mt-6 mb-2">4. AI Content Policy</h2>
      <p>
        TheAskt uses AI-assisted workflows to support parts of our content creation process, which may include: drafting initial versions of articles, summarizing news announcements, assisting with outlines, and formatting code. AI is a <strong>tool</strong> used by our editorial process — it is not a substitute for human judgment on what to publish.
      </p>
      <p className="mt-2">
        We apply human review to AI-assisted content <strong>whenever practical</strong> before publication. This review process checks for factual accuracy, tone, clarity, and the removal of inaccurate or nonsensical AI-generated content (&ldquo;hallucinations&rdquo;). Human review may not catch every issue in every case, particularly for high-volume or time-sensitive content such as breaking AI news.
      </p>

      <h2 className="font-heading text-lg font-bold text-foreground mt-6 mb-2">5. Corrections Policy</h2>
      <p>
        Errors identified after publication are corrected promptly:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground my-2">
        <li><strong>Major Corrections:</strong> Involve substantive factual errors (incorrect pricing, misattributed quotes, or materially wrong claims). These are clearly noted within the article with a visible &ldquo;Correction&rdquo; tag and date.</li>
        <li><strong>Minor Corrections:</strong> Involve non-substantive fixes (typos, grammar, minor clarifications). These are made directly without separate public notice.</li>
      </ul>

      <h2 className="font-heading text-lg font-bold text-foreground mt-6 mb-2">6. Ethics & Transparency Policy</h2>
      <p>
        TheAskt is committed to operating with high ethical standards. We do not present AI-generated content as being written entirely by a named human author unless a human wrote or substantively edited it. We avoid using AI to generate misleading, deceptive, or fabricated news. Advertising, sponsorships, and partnerships never determine or influence the substance of our editorial content.
      </p>

      <h2 className="font-heading text-lg font-bold text-foreground mt-6 mb-2">7. Content Licensing Policy</h2>
      <p>
        Except where otherwise indicated, all original text, workflows, and graphics published on TheAskt are copyrighted. You may quote short excerpts or use screenshots for educational, review, or non-commercial purposes, provided you include a clickable, followable link back to the source page on TheAskt. Large-scale reproduction or syndication is strictly prohibited without prior written license.
      </p>
    </PolicyLayout>
  );
}
