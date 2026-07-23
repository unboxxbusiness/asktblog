import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getCourses } from "@/services/articles";
import ArticleBody from "@/features/articles/ArticleBody";
import CourseAccordionSidebar from "@/components/courses/CourseAccordionSidebar";
import { ArrowLeft, ArrowRight, Clock, Sparkles, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { courseSlug } = await params;
  const article = await getArticleBySlug(courseSlug);
  if (!article) return {};

  return {
    title: `${article.title} | TheAskt Skill Path`,
    description: article.excerpt,
  };
}

export default async function GoogleStyleCourseViewer({ params }: PageProps) {
  const { courseSlug } = await params;
  const currentArticle = await getArticleBySlug(courseSlug);

  if (!currentArticle) {
    notFound();
  }

  // Fetch all published course articles
  const allCourses = await getCourses();

  // Determine parent course series title for current article
  const currentSeriesTitle = (currentArticle.sourceName && currentArticle.sourceName.trim().length > 3)
    ? currentArticle.sourceName.trim().toLowerCase()
    : currentArticle.title.replace(/^Part\s*\d+:\s*/i, "").split("—")[0].split("-")[0].trim().toLowerCase();

  // Filter ONLY sibling modules belonging to this exact course series
  const siblingArticles = allCourses.filter((c) => {
    const cSeries = (c.sourceName && c.sourceName.trim().length > 3)
      ? c.sourceName.trim().toLowerCase()
      : c.title.replace(/^Part\s*\d+:\s*/i, "").split("—")[0].split("-")[0].trim().toLowerCase();
    return cSeries === currentSeriesTitle;
  });

  // Sort modules Part 1 to Part 5
  siblingArticles.sort((a, b) => {
    const partA = parseInt(a.title.match(/Part\s*(\d+)/i)?.[1] || "1", 10);
    const partB = parseInt(b.title.match(/Part\s*(\d+)/i)?.[1] || "1", 10);
    return partA - partB;
  });

  const courseModules = siblingArticles.map((c, i) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    readingTime: c.readingTime || 5,
    part: i + 1,
  }));

  const currentIdx = courseModules.findIndex((m) => m.slug === courseSlug);
  const activePartNum = currentIdx >= 0 ? currentIdx + 1 : 1;
  const prevModule = currentIdx > 0 ? courseModules[currentIdx - 1] : null;
  const nextModule = currentIdx < courseModules.length - 1 ? courseModules[currentIdx + 1] : null;

  const cleanCourseTitle = (currentArticle.sourceName && currentArticle.sourceName.trim().length > 3)
    ? currentArticle.sourceName.trim()
    : currentArticle.title.replace(/^Part\s*\d+:\s*/i, "").split("—")[0].trim();

  return (
    <div className="min-h-screen bg-background">
      
      {/* 1. Google Skills Style Course Header Card */}
      <div className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/courses" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Skill Paths
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium truncate">{cleanCourseTitle}</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5 text-blue-400" />
                  Google-Inspired Skill Path
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Saves ~8 Hours/Week
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  Module {activePartNum} of {courseModules.length}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {currentArticle.title}
              </h1>
            </div>

            {/* Progress Badge */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center shrink-0 min-w-[160px]">
              <span className="text-xs text-slate-400 font-medium block">Path Progress</span>
              <span className="text-2xl font-bold text-emerald-400 block my-0.5">
                {Math.round((activePartNum / Math.max(1, courseModules.length)) * 100)}%
              </span>
              <span className="text-[11px] text-slate-300">
                {activePartNum} of {courseModules.length} Modules
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Course Reader & Accordion Sidebar */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Google-Style Accordion Sidebar */}
          <CourseAccordionSidebar
            courseTitle={cleanCourseTitle}
            modules={courseModules}
            currentSlug={courseSlug}
            trackName={currentArticle.category || "Automation Skill Path"}
            timeSavings="Saves ~8 Hours/Week"
          />

          {/* Right Column: High-Quality Article Content Reader */}
          <div className="flex-1 min-w-0 bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-sm w-full space-y-8">
            
            {/* Lead Excerpt Summary */}
            {currentArticle.excerpt && (
              <div className="bg-muted/40 border-l-4 border-primary p-4 rounded-r-xl text-sm text-foreground leading-relaxed">
                <strong>Module Overview:</strong> {currentArticle.excerpt}
              </div>
            )}

            {/* Full 1,000+ Word Content rendering custom geo-* elements */}
            <ArticleBody
              htmlContent={currentArticle.content}
              category={currentArticle.category || "Automation"}
            />

            {/* Bottom Module Navigation Controls */}
            <div className="pt-8 border-t border-border/60 flex items-center justify-between gap-4">
              {prevModule ? (
                <Link
                  href={`/courses/${prevModule.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Module
                </Link>
              ) : (
                <div />
              )}

              {nextModule ? (
                <Link
                  href={`/courses/${nextModule.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm ml-auto"
                >
                  Next Module
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm ml-auto"
                >
                  Complete Course Path
                  <CheckCircle2 className="w-4 h-4" />
                </Link>
              )}
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
