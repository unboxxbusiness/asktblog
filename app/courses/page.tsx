import React from "react";
import Link from "next/link";
import { getCourses } from "@/services/articles";
import { BookOpen, Sparkles, Clock, ArrowRight, Zap, GraduationCap, Briefcase, Cpu } from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "AI & Automation Micro-Courses | TheAskt",
  description: "Explore 5-part practical micro-courses designed to save 5 to 10 hours of manual work every week for students, professionals, and daily AI users.",
};

export default async function CoursesHubPage() {
  const allCourseArticles = await getCourses();

  // Group course articles into unique series by title prefix
  const seriesMap = new Map<string, typeof allCourseArticles>();

  allCourseArticles.forEach((art) => {
    // Extract series key from title or category
    const mainTitle = art.title.replace(/^Part\s*\d+:\s*/i, "");
    const seriesKey = art.category || "Automation";

    if (!seriesMap.has(seriesKey)) {
      seriesMap.set(seriesKey, []);
    }
    seriesMap.get(seriesKey)!.push(art);
  });

  const tracks = [
    { name: "🎓 For Students", desc: "Save 10 hrs/week on research, active recall & exams", icon: GraduationCap },
    { name: "💼 For Professionals", desc: "Save 8 hrs/week on reports, email & client onboarding", icon: Briefcase },
    { name: "⚡ For Daily AI Users", desc: "Save 5 hrs/week on everyday digital tasks & prompts", icon: Zap },
    { name: "⚙️ Automation & AI Skills", desc: "Build self-running n8n, Make.com & LangGraph systems", icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            Practical 5-Part Micro-Courses
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Learn Practical AI Systems. <br className="hidden sm:inline" />
            <span className="text-primary">Save 5–10 Hours Every Week.</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Step-by-step 5-part course series designed for students, professionals, and developers to automate work with zero fluff.
          </p>
        </div>

        {/* Audience Track Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((tr, i) => {
            const Icon = tr.icon;
            return (
              <div key={i} className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base">{tr.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{tr.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Featured Micro-Courses Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Published Micro-Courses
            </h2>
            <span className="text-xs text-muted-foreground font-semibold">
              {allCourseArticles.length} Modules Published
            </span>
          </div>

          {allCourseArticles.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-2xl border border-border/60">
              <p className="text-muted-foreground text-sm">No micro-courses published yet. Run `python scripts/build_full_1k_course.py` to generate!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourseArticles.slice(0, 9).map((art) => (
                <div key={art.id} className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                        {art.category}
                      </span>
                      <span className="text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Saves ~8h/wk
                      </span>
                    </div>

                    <h3 className="font-bold text-foreground text-lg line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/courses/${art.slug}`}>{art.title}</Link>
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="p-6 pt-0 mt-auto">
                    <Link
                      href={`/courses/${art.slug}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Start Course Module
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
