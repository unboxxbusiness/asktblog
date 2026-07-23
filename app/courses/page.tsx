import React from "react";
import Link from "next/link";
import { getCourses } from "@/services/articles";
import { Sparkles, Clock, ArrowRight, GraduationCap, Briefcase, Zap, Cpu, Award, ShieldCheck, CheckCircle } from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "AI & Automation Learning Paths | TheAskt Skills",
  description: "Google-inspired self-paced micro-courses designed to save 5 to 10 hours of work every week for students, professionals, and daily AI users.",
};

export default async function GoogleStyleCoursesPage() {
  const allCourseArticles = await getCourses();

  // Group course articles into unique series
  const courseSeriesMap = new Map<string, {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    modules: typeof allCourseArticles;
    image: string;
  }>();

  allCourseArticles.forEach((art) => {
    // Extract base course title without Part prefix
    const cleanTitle = art.title.replace(/^Part\s*\d+:\s*/i, "").split("—")[0].trim();
    
    if (!courseSeriesMap.has(cleanTitle)) {
      courseSeriesMap.set(cleanTitle, {
        title: cleanTitle,
        slug: art.slug,
        excerpt: art.excerpt || "Comprehensive 5-module practical learning path.",
        category: art.category || "Automation",
        modules: [],
        image: art.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
      });
    }
    courseSeriesMap.get(cleanTitle)!.modules.push(art);
  });

  const courseList = Array.from(courseSeriesMap.values());

  const tracks = [
    { name: "🎓 Student Track", desc: "Exam prep, research, active recall & thesis automation", color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20" },
    { name: "💼 Professional Track", desc: "Executive reports, meeting notes & inbox zero workflows", color: "from-purple-500/10 to-violet-500/10 border-purple-500/20" },
    { name: "⚡ Daily AI Users", desc: "Prompt shortcuts, browser extensions & daily file hacks", color: "from-amber-500/10 to-orange-500/10 border-amber-500/20" },
    { name: "⚙️ Automation Skills", desc: "Production n8n, Make.com, LangGraph & MCP architectures", color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20" },
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* 1. Google-Inspired Hero Banner */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 opacity-40 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-300 border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            TheAskt Learning Paths & Skill Badges
          </div>
          
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight">
            Master Practical AI Systems. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              Save 5 to 10 Hours Every Week.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl leading-relaxed">
            Structured, 5-part self-paced learning paths designed for students, professionals, and developers. No fluff—just real-world skills and time savings.
          </p>

          {/* High-Impact Proof Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 max-w-3xl">
            <div className="space-y-1">
              <span className="text-2xl font-bold text-white flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-emerald-400" />
                5–10 hrs
              </span>
              <p className="text-xs text-slate-400 font-medium">Weekly Time Reclaimed</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                100% Free
              </span>
              <p className="text-xs text-slate-400 font-medium">Open Learning Access</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-white flex items-center gap-1.5">
                <Award className="w-5 h-5 text-amber-400" />
                Skill Badges
              </span>
              <p className="text-xs text-slate-400 font-medium">Verified Frameworks</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                5 Modules
              </span>
              <p className="text-xs text-slate-400 font-medium">Step-by-Step Sequence</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Hub Container */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Track Category Overview Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Explore Learning Tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((tr, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${tr.color} border rounded-2xl p-4 space-y-2`}>
                <h3 className="font-bold text-foreground text-sm">{tr.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{tr.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Paths Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Available Skill Paths</h2>
              <p className="text-xs text-muted-foreground">Select a 5-module learning path to start building real-world automation skills.</p>
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {courseList.length} Active Courses
            </span>
          </div>

          {courseList.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border/80 space-y-3">
              <Sparkles className="w-8 h-8 text-primary mx-auto" />
              <p className="text-muted-foreground text-sm">Course learning paths are updating. Run `python scripts/publish_course_series.py` to populate!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseList.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Course Banner Image */}
                    <div className="h-44 w-full relative overflow-hidden bg-muted">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        5-Module Path
                      </div>
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Clock className="w-3 h-3" />
                        Saves ~8h/wk
                      </div>
                    </div>

                    {/* Course Info Body */}
                    <div className="p-5 space-y-3">
                      <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                        {course.category || "Automation Track"}
                      </span>

                      <h3 className="font-bold text-foreground text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                      </h3>

                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {course.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="p-5 pt-0 mt-auto">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      Start Learning Path
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
