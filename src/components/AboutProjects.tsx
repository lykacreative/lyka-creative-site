import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import portfolioData from "../data/portfolioContent.json";
import FadeIn from "./FadeIn";

// ─── Projects Data ────────────────────────────────────────────────────────────
const projects = [
  {
    num: "01",
    client: "CLIENT",
    name: "Elanora",
    logoText: "Elanora",
    desc: "UGC ad editing: full-cycle. Footage, pacing, sound, polish. Strict brand/creative adherence.",
    tags: ["UGC Production", "Brand Continuity"],
    imgLeft1: "/elanora_1.jpg",
    imgLeft2: "/elanora_2.jpg",
    imgRight: "/elanora_3.jpg",
  },
  {
    num: "02",
    client: "CLIENT",
    name: "Based Supplies",
    logoText: "Based Supplies",
    desc: "Full managerial services and UGC ad editing: full-cycle. Footage, pacing, sound, polish. Strict brand/creative adherence.",
    tags: ["UGC Production", "Brand Identity"],
    imgLeft1: "/based_supplies_1.jpg",
    imgLeft2: "/based_supplies_2.jpg",
    imgRight: "/based_supplies_3.jpg",
  },
  // {
  //   num: "03",
  //   client: "CLIENT",
  //   name: "Addisai",
  //   logoText: "Addis Ai",
  //   desc: "A short documentary exploring identity through archival footage and interviews.",
  //   tags: ["EDITING", "SOUND DESIGN"],
  //   imgLeft1:
  //     "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
  //   imgLeft2:
  //     "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
  //   imgRight:
  //     "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  // },
];

// ─── Project Card (sticky scroll) ────────────────────────────────────────────
function Card({ project, index, progress, targetScale }: any) {
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);

  return (
    <div className="h-[90vh] flex items-center justify-center sticky top-24 md:top-32 w-full pb-[10vh]">
      <motion.div
        style={{ scale, top: `calc(${index * 28}px)` }}
        className="relative w-full max-w-6xl mx-auto rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-[#D7E2EA]/30 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] origin-top h-full"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <span className="font-black text-[#D7E2EA] text-[clamp(2.5rem,6vw,90px)] leading-none">
              {project.num}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA] opacity-60 uppercase text-xs md:text-sm tracking-widest">
                {project.client}
              </span>
              <h3
                className="drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)] mb-6 select-none font-normal italic text-white/90"
                style={{
                  fontSize: "clamp(32px, 5.5vw, 76px)",
                  lineHeight: 1.05,
                  fontFamily: "'Instrument Serif', serif",
                }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:items-end max-w-xs text-left sm:text-right gap-3">
            <p className="text-[#D7E2EA]/80 font-light text-sm sm:text-base">
              {project.desc}
            </p>
            <div className="flex gap-2 flex-wrap sm:justify-end mt-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] text-[#D7E2EA] border border-[#D7E2EA]/30 rounded-full px-3 py-1 uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6 flex-1 min-h-[300px]">
          <div className="w-[40%] flex flex-col gap-4 md:gap-6 h-full justify-between">
            <img
              src={project.imgLeft1}
              loading="lazy"
              className="w-full object-cover rounded-[20px] md:rounded-[40px] h-full max-h-[35%] min-h-[100px]"
              alt=""
            />
            <img
              src={project.imgLeft2}
              loading="lazy"
              className="w-full object-cover rounded-[20px] md:rounded-[40px] h-full max-h-[60%] min-h-[130px]"
              alt=""
            />
          </div>
          <div className="w-[60%] h-full relative">
            <img
              src={project.imgRight}
              loading="lazy"
              className="w-full h-full absolute inset-0 object-cover rounded-[30px] md:rounded-[40px]"
              alt=""
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent rounded-b-[30px] md:rounded-b-[40px] flex justify-between items-end hidden sm:flex">
              <span className="text-white font-black text-2xl uppercase tracking-widest">
                {project.logoText}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AboutProjects() {
  const { about } = portfolioData.aboutAndProjects;
  const projectsContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: projectsContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* ── ABOUT SECTION ── */}
      <section
        id="about"
        className="relative w-full bg-black border-t border-white/5 overflow-hidden"
      >
        {/* Cosmic Nebula Background Layer - About/Craft Theme */}
        <div
          className="absolute inset-0 z-0 pointer-events-none select-none"
          style={{
            background: `
              radial-gradient(ellipse 110% 70% at 75% 30%, rgba(236, 72, 153, 0.12), transparent 55%),
              radial-gradient(ellipse 120% 60% at 20% 70%, rgba(147, 51, 234, 0.10), transparent 60%),
              radial-gradient(ellipse 90% 80% at 80% 80%, rgba(59, 130, 246, 0.08), transparent 50%),
              radial-gradient(ellipse 100% 50% at 30% 20%, rgba(16, 185, 129, 0.06), transparent 45%),
              #000000
            `,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-28 sm:py-40">
          {/* Label */}
          <FadeIn y={15} delay={0.05}>
            <div className="flex items-center gap-3 mb-16 sm:mb-20">
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="text-[10px] text-white/40 tracking-widest uppercase">
                About
              </span>
            </div>
          </FadeIn>

          {/* Main grid: text left, image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: text */}
            <div className="flex flex-col">
              <FadeIn y={30} delay={0.15}>
                <h2
                  className="text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] mb-10"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {about.title.split(" ").slice(0, -3).join(" ")}{" "}
                  <span className="italic font-light text-white/85">
                    {about.title.split(" ").slice(-3).join(" ")}
                  </span>
                </h2>
              </FadeIn>

              <FadeIn y={25} delay={0.25} className="space-y-5">
                {about.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-white/55 text-[15px] sm:text-[16px] leading-relaxed font-normal"
                  >
                    {p}
                  </p>
                ))}
              </FadeIn>

              <FadeIn y={20} delay={0.35} className="mt-10">
                <a
                  href="/me"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, "", "/me");
                    window.dispatchEvent(new Event("popstate"));
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                  className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-white hover:text-green-400 group transition-colors duration-300 cursor-pointer"
                >
                  {about.ctaText}
                  <ArrowUpRight
                    size={14}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </a>
              </FadeIn>
            </div>

            {/* Right: creative image block */}
            <FadeIn y={40} delay={0.2} className="relative">
              {/* Grain / noise texture overlay */}
              <div
                className="absolute inset-0 z-10 rounded-[32px] pointer-events-none opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                  backgroundSize: "128px",
                }}
              />

              {/* Glowing ring behind image */}
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 blur-xl pointer-events-none" />

              {/* Image frame */}
              <div className="relative rounded-[32px] overflow-hidden border border-white/8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                <img
                  src="/me.jpg"
                  alt="Lyka — creative director"
                  loading="lazy"
                  className="w-full object-cover aspect-[4/5]"
                  style={{ objectPosition: "center 20%" }}
                />

                {/* Bottom gradient overlay with subtle text */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex items-end justify-between">
                  <div>
                    <p
                      className="text-white/90 text-lg sm:text-xl font-normal leading-tight"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      Six years of craft.
                      <br />
                      <span className="italic text-white/60">
                        Every frame intentional.
                      </span>
                    </p>
                  </div>
                  {/*<div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] text-white/30 uppercase tracking-widest">
                      Video Editor
                    </span>
                    <span className="text-[9px] text-white/30 uppercase tracking-widest">
                      Motion Designer
                    </span>
                  </div>*/}
                </div>
              </div>

              {/* Floating badge — top left */}
              <motion.div
                className="absolute -top-4 -left-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-xl z-20"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">
                  Experience
                </p>
                <p
                  className="text-white text-lg font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  6+ Years
                </p>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-xl z-20"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.75, duration: 0.6 }}
              >
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">
                  Creatives
                </p>
                <p
                  className="text-white text-lg font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  250+ Delivered
                </p>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PROJECTS SECTION ── */}
      <section
        id="work"
        className="bg-black relative z-20 px-5 sm:px-8 md:px-10 py-24 sm:py-32"
      >
        {/* Cosmic Nebula Background Layer - Work/Portfolio Theme */}
        <div
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 130% 60% at 15% 30%, rgba(147, 51, 234, 0.10), transparent 65%),
              radial-gradient(ellipse 100% 70% at 85% 70%, rgba(16, 185, 129, 0.08), transparent 55%),
              radial-gradient(ellipse 110% 50% at 50% 80%, rgba(59, 130, 246, 0.08), transparent 50%),
              radial-gradient(ellipse 80% 90% at 75% 20%, rgba(236, 72, 153, 0.06), transparent 45%),
              #000000
            `,
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex flex-col items-center mb-16 sm:mb-24 text-center">
          <span className="text-xs sm:text-sm text-[#D7E2EA] opacity-60 uppercase tracking-widest border border-[#D7E2EA]/20 px-4 py-1.5 rounded-full mb-6">
            SELECTED WORK
          </span>
          <h2
            className="drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)] mb-6 select-none font-normal italic text-white/90"
            style={{
              fontSize: "clamp(48px, 8vw, 105px)",
              lineHeight: 1.05,
              fontFamily: "'Instrument Serif', serif",
            }}
          >
            Featured projects
          </h2>
          <button
            onClick={() => {
              window.history.pushState({}, "", "/projects");
              window.dispatchEvent(new Event("popstate"));
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            className="text-[#D7E2EA] font-medium uppercase tracking-widest hover:text-white transition-colors border-b border-[#D7E2EA]/30 hover:border-white pb-1 text-sm mt-4 cursor-pointer"
          >
            View all →
          </button>
        </div>

        {/* Sticky scroll cards */}
        <div ref={projectsContainerRef} className="relative z-10 w-full">
          {projects.map((proj, i) => {
            const targetScale = 1 - (projects.length - 1 - i) * 0.03;
            return (
              <Card
                key={proj.num}
                project={proj}
                index={i}
                progress={scrollYProgress}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
