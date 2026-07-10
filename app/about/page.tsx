import React from "react";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "About Us - TheAskt",
  description: "Learn more about our mission, vision, and values at TheAskt.",
};

export default function AboutUsPage() {
  return (
    <PolicyLayout title="About Us" lastUpdated="July 9, 2026">
      <p className="lead text-base font-semibold text-foreground/80 mb-6">
        <strong>TheAskt</strong> exists to make Artificial Intelligence understandable, practical, and useful for everyday people — students, graduates, freelancers, professionals, and businesses.
      </p>

      <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-2">Our Mission</h2>
      <p>
        Our mission is simple: <strong>turn AI from an intimidating buzzword into a practical skill anyone can learn and apply.</strong> We bridge the gap between AI innovation and everyday adoption, helping you learn how to actually use AI to do your work better, automate repetitive tasks, and scale your business.
      </p>

      <h2 className="font-heading text-lg font-bold text-foreground mt-6 mb-2">Our Vision</h2>
      <p>
        We envision a future where AI literacy is as common and essential as computer literacy. TheAskt aims to be a trusted, ever-current companion on your learning journey — helping you discover tools worth trying, workflows worth adopting, and opportunities worth pursuing.
      </p>

      <h2 className="font-heading text-lg font-bold text-foreground mt-6 mb-2">Our Core Values</h2>
      <ul className="list-disc pl-5 space-y-2 text-xs text-muted-foreground mt-3">
        <li><strong>Clarity over complexity:</strong> We explain technical concepts simply without oversimplification.</li>
        <li><strong>Honesty over hype:</strong> We evaluate tools transparently and say so when something falls short.</li>
        <li><strong>Practicality first:</strong> We prioritize actionable code, workflows, and tools that yield results today.</li>
        <li><strong>Respect for the reader:</strong> We maintain a lightweight platform footprint, requiring no sign-ups or unnecessary personal data storage.</li>
      </ul>

      <h2 className="font-heading text-lg font-bold text-foreground mt-6 mb-2">Editorial Philosophy</h2>
      <p>
        Our editorial standards rest on three core pillars: <strong>Accuracy first</strong>, <strong>Usefulness over volume</strong>, and <strong>Strict human oversight</strong>. While we leverage AI-assisted tools in drafting workflows, our content undergoes strict editorial validation to ensure real-world correctness.
      </p>
    </PolicyLayout>
  );
}
