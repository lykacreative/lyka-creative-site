import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import FadeIn from "./FadeIn";

// ─── Projects Data ────────────────────────────────────────────────────────────
const allProjects = [
  {
    num: "01",
    client: "CLIENT",
    name: "Elanora",
    logoText: "Elanora",
    category: "UGC Production",
    desc: "UGC ad editing: full-cycle. Footage, pacing, sound, polish. Strict brand/creative adherence.",
    tags: ["UGC Production", "Brand Continuity"],
    imgLeft1: "/elanora_1.jpg",
    imgLeft2: "/elanora_2.jpg",
    imgRight: "/elanora_3.jpg",
    featured: true,
  },
  {
    num: "02",
    client: "CLIENT",
    name: "Based Supplies",
    logoText: "Based Supplies",
    category: "UGC Production",
    desc: "Full managerial services and UGC ad editing: full-cycle. Footage, pacing, sound, polish. Strict brand/creative adherence.",
    tags: ["UGC Production", "Brand Identity"],
    imgLeft1: "/based_supplies_1.jpg",
    imgLeft2: "/based_supplies_2.jpg",
    imgRight: "/based_supplies_3.jpg",
    featured: true,
  },
  {
    num: "03",
    client: "CLIENT",
    name: "Addis AI",
    logoText: "Addis AI",
    category: "Video Editing",
    desc: "End-to-end digital storytelling combining strategic content planning with premium video editing. Blending technical post-production with social optimization to build brand authority.",
    tags: ["Video Editing", "Content Creation", "Social Media Strategy"],
    imgRight: "/projects/addisai.jpg",
    featured: false,
  },
  {
    num: "04",
    client: "CLIENT",
    name: "Bricks",
    logoText: "Bricks",
    category: "Social Media",
    desc: "Curating visual narratives and elevating digital presence. High-end social media curation and organic content creation designed to capture and hold brand attention.",
    tags: ["Social Media Management", "Content Creation", "Visual Curation"],
    imgRight: "/projects/bricks.jpg",
    featured: false,
  },
  {
    num: "05",
    client: "CLIENT",
    name: "Biruhfit",
    logoText: "Biruhfit",
    category: "Social Media",
    desc: "Strategic social media expansion and creative asset production. Crafting high-converting visual campaigns and establishing a premium, consistent identity across channels.",
    tags: ["Social Media Strategy", "Content Production", "Growth Scaling"],
    imgRight: "/projects/biruhfit.jpg",
    featured: false,
  },
];

// Helper to navigate client-side
const navigateTo = (path: string) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
  window.scrollTo({ top: 0, behavior: "instant" });
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "UGC Production", "Social Media", "Video Editing"];

  const filteredProjects = allProjects.filter((project) => {
    if (selectedCategory === "All") return true;
    return project.category === selectedCategory;
  });

  useEffect(() => {
    // Reset scroll position on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden select-none font-sans pt-32 pb-24">
      {/* Cosmic Nebula Background Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 120% 70% at 80% 20%, rgba(236, 72, 153, 0.10), transparent 60%),
            radial-gradient(ellipse 110% 60% at 15% 80%, rgba(147, 51, 234, 0.08), transparent 55%),
            radial-gradient(ellipse 90% 70% at 50% 40%, rgba(59, 130, 246, 0.06), transparent 50%),
            radial-gradient(ellipse 100% 50% at 90% 90%, rgba(16, 185, 129, 0.05), transparent 45%),
            #000000
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Back Button */}
        <div className="mb-12">
          <button
            onClick={() => navigateTo("/")}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 cursor-pointer group"
          >
            <ArrowLeft
              size={14}
              className="transform group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to Home
          </button>
        </div>

        {/* Page Header */}
        <div className="mb-16">
          <FadeIn y={15} delay={0.05}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="text-[10px] text-white/40 tracking-widest uppercase">
                Portfolio Archive
              </span>
            </div>
          </FadeIn>

          <FadeIn y={25} delay={0.1}>
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl text-white font-normal leading-[1.05] mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              All Creative{" "}
              <span className="italic font-light text-white/85">Works.</span>
            </h1>
          </FadeIn>

          <FadeIn y={20} delay={0.15}>
            <p className="text-white/50 max-w-xl text-[15px] sm:text-[16px] leading-relaxed font-light">
              Explore the full narrative of UGC advertisements, premium post-production edits, and dynamic social media growth campaigns engineered for high conversions and high-end visual aesthetics.
            </p>
          </FadeIn>
        </div>

        {/* Category Filters */}
        <FadeIn y={10} delay={0.2} className="mb-16">
          <div className="flex flex-wrap gap-3 border-b border-white/10 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 text-xs font-medium tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "text-black bg-white"
                    : "text-white/60 hover:text-white border border-white/10 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full"
              >
                {project.featured ? (
                  /* Featured Full-Width Card (Elanora / Based Supplies) */
                  <div className="relative w-full rounded-[40px] border border-[#D7E2EA]/15 bg-[#0C0C0C]/80 p-6 md:p-8 flex flex-col gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden hover:border-[#D7E2EA]/30 transition-colors duration-500">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                      <div className="flex items-start gap-4 md:gap-6">
                        <span className="font-black text-[#D7E2EA] text-[clamp(2.5rem,5vw,70px)] leading-none opacity-40">
                          {project.num}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[#D7E2EA] opacity-40 uppercase text-xs tracking-widest">
                            {project.client}
                          </span>
                          <h3
                            className="font-normal italic text-white/95"
                            style={{
                              fontSize: "clamp(30px, 4.5vw, 62px)",
                              lineHeight: 1.1,
                              fontFamily: "'Instrument Serif', serif",
                            }}
                          >
                            {project.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end max-w-sm text-left md:text-right gap-3">
                        <p className="text-[#D7E2EA]/75 font-light text-sm md:text-[15px] leading-relaxed">
                          {project.desc}
                        </p>
                        <div className="flex gap-2 flex-wrap md:justify-end mt-2">
                          {project.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[9px] text-[#D7E2EA]/80 border border-[#D7E2EA]/20 rounded-full px-2.5 py-0.5 uppercase tracking-widest bg-white/2"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Image grid layout */}
                    <div className="flex gap-4 md:gap-6 min-h-[250px] md:min-h-[380px] h-[30vh] md:h-[45vh]">
                      <div className="w-[40%] flex flex-col gap-4 md:gap-6 justify-between">
                        <div className="relative overflow-hidden rounded-[20px] md:rounded-[30px] h-[35%] w-full group">
                          <img
                            src={project.imgLeft1}
                            loading="lazy"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            alt=""
                          />
                        </div>
                        <div className="relative overflow-hidden rounded-[20px] md:rounded-[30px] h-[60%] w-full group">
                          <img
                            src={project.imgLeft2}
                            loading="lazy"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="w-[60%] relative overflow-hidden rounded-[30px] md:rounded-[40px] group">
                        <img
                          src={project.imgRight}
                          loading="lazy"
                          className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-105 transition-transform duration-700"
                          alt=""
                        />
                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-end">
                          <span className="text-white font-black text-xl md:text-2xl uppercase tracking-widest">
                            {project.logoText}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Grid/Archive Cards (Addis AI, Bricks, Biruhfit) */
                  <div className="relative w-full rounded-[40px] border border-white/5 bg-[#080808]/70 p-6 md:p-8 flex flex-col lg:flex-row gap-8 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-md hover:border-white/15 transition-colors duration-500 overflow-hidden group">
                    {/* Left/Content area */}
                    <div className="flex-1 flex flex-col justify-between order-2 lg:order-1">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <span className="font-black text-[#D7E2EA] text-4xl opacity-30">
                            {project.num}
                          </span>
                          <span className="text-[10px] text-[#D7E2EA]/50 border border-[#D7E2EA]/20 rounded-full px-2 py-0.5 uppercase tracking-widest">
                            {project.category}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <h3
                            className="font-normal italic text-white/95"
                            style={{
                              fontSize: "clamp(28px, 4vw, 48px)",
                              lineHeight: 1.1,
                              fontFamily: "'Instrument Serif', serif",
                            }}
                          >
                            {project.name}
                          </h3>
                          <p className="text-[#D7E2EA]/70 font-light text-sm md:text-[15px] leading-relaxed max-w-xl">
                            {project.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-8 lg:mt-0">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[9px] text-white/70 border border-white/10 rounded-full px-2.5 py-0.5 uppercase tracking-widest bg-white/2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right/Image area with premium presentation */}
                    <div className="w-full lg:w-[45%] aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[300px] relative overflow-hidden rounded-[24px] md:rounded-[32px] border border-white/10 order-1 lg:order-2 group-hover:border-white/20 transition-colors duration-500">
                      <img
                        src={project.imgRight}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        alt={project.name}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/80 border border-white/10 flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                          <ArrowUpRight size={18} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-6 text-white font-black text-sm uppercase tracking-widest z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
                        {project.logoText}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/40 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
