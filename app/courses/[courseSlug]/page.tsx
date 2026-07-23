import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getCourses } from "@/services/articles";
import ArticleBody from "@/features/articles/ArticleBody";
import CourseAccordionSidebar from "@/components/courses/CourseAccordionSidebar";
import { ArrowLeft, ArrowRight, Clock, Sparkles } from "lucide-react";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { courseSlug } = await params;
  const article = await getArticleBySlug(courseSlug);
  if (!article) return {};

  return {
    title: `${article.title} | TheAskt Courses`,
    description: article.excerpt,
  };
}

export default async function CourseSlugPage({ params }: PageProps) {
  const { courseSlug } = await params;
  const currentArticle = await getArticleBySlug(courseSlug);

  if (!currentArticle) {
    notFound();
  }

  // Fetch all published course articles to populate sidebar accordion
  const allCourses = await getCourses();

  // Find all sibling modules belonging to the same course or category
  const courseModules = allCourses.map((c, i) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    readingTime: c.readingTime || 5,
    part: i + 1,
  }));

  const currentIdx = courseModules.findIndex((m) => m.slug === courseSlug);
  const prevModule = currentIdx > 0 ? courseModules[currentIdx - 1] : null;
  const nextModule = currentIdx < courseModules.length - 1 ? courseModules[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/courses" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            All Courses Hub
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{currentArticle.title}</span>
        </div>

        {/* Master Course Viewer Layout: Sidebar Accordion + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sticky Accordion Sidebar */}
          <CourseAccordionSidebar
            courseTitle={currentArticle.title.replace(/^Part\s*\d+:\s*/i, "")}
            modules={courseModules}
            currentSlug={courseSlug}
            trackName={currentArticle.category || "Automation Track"}
            timeSavings="Saves ~8 Hours/Week"
          />

          {/* Main Article Content Reader */}
          <main className="flex-1 min-w-0 bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-sm w-full">
            
            {/* Header Metadata */}
            <div className="space-y-4 border-b border-border/60 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Module {currentIdx >= 0 ? currentIdx + 1 : 1} of {courseModules.length}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentArticle.readingTime || 6} min read
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
                {currentArticle.title}
              </h1>

              {currentArticle.excerpt && (
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {currentArticle.excerpt}
                </p>
              )}
            </div>

            {/* Content Body complying with CONTENT_FRAMEWORK.md */}
            <ArticleBody
              htmlContent={currentArticle.content}
              category={currentArticle.category || "Automation"}
            />

            {/* Bottom Module Navigation Buttons */}
            <div className="mt-12 pt-6 border-t border-border/60 flex items-center justify-between gap-4">
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors ml-auto"
                >
                  Next Module
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors ml-auto"
                >
                  Complete Course Hub
                  <Sparkles className="w-4 h-4" />
                </Link>
              )}
            </div>

          </main>
        </div>

      </div>
    </div>
  );
}
