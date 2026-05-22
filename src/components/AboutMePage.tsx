import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Compass,
  Eye,
  Layers,
  MonitorCloud,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect } from "react";
import FadeIn from "./FadeIn";

const navigateTo = (path: string) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
  window.scrollTo({ top: 0, behavior: "instant" });
};

const handleContactClick = (e: React.MouseEvent) => {
  e.preventDefault();
  window.history.pushState({}, "", "/");
  window.dispatchEvent(new Event("popstate"));
  setTimeout(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, 150);
};

export default function AboutMePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    {
      icon: <Layers size={20} className="text-purple-400" />,
      title: "Cinematic Post-Production",
      desc: "Impeccable pacing, fluid storytelling, and advanced visual structures. Every cut, split, and transition is deliberate and tailored to maximize audience retention.",
    },
    {
      icon: <MonitorCloud size={20} className="text-pink-400" />,
      title: "UGC Ad Architecture",
      desc: "Conversion-optimized UGC scripting and hook strategy. Engineered to capture attention in the first 3 seconds and seamlessly guide viewers to action.",
    },
    {
      icon: <Volume2 size={20} className="text-emerald-400" />,
      title: "Sound & Audio Polish",
      desc: "Immersive soundscapes, professional sound styling, and rhythmic audio design that elevate visual media from standard to fully premium.",
    },
    {
      icon: <ShieldCheck size={20} className="text-blue-400" />,
      title: "Brand Aesthetic Curation",
      desc: "Establishing absolute visual coherence. Developing unified brand styles, custom color schemes, and pacing guides that keep digital assets consistent.",
    },
  ];

  const frameworkMetrics = [
    {
      label: "HOOK RATE",
      metric: "3-Second attention capture",
      desc: "Optimizing the intro frames, visuals, and copy hooks to stop the scroll and immediately establish brand curiosity.",
      icon: <Eye size={16} className="text-purple-400" />,
    },
    {
      label: "HOLD RATE",
      metric: "Sustained view retention",
      desc: "Employing seamless dynamic editing, sound design, and logical progression to hold the viewer to the very end of the creative loop.",
      icon: <Layers size={16} className="text-pink-400" />,
    },
    {
      label: "CONVERSION FOCUS",
      metric: "ROI-driven visual pacing",
      desc: "Bridging the gap between high-end cinematic visuals and direct marketing objectives to drive conversions and lower acquisition costs.",
      icon: <BarChart3 size={16} className="text-emerald-400" />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-clip select-none font-sans pt-32 pb-24">
      {/* Cosmic Nebula Background Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 100% 70% at 20% 30%, rgba(147, 51, 234, 0.12), transparent 55%),
            radial-gradient(ellipse 120% 60% at 85% 75%, rgba(236, 72, 153, 0.10), transparent 60%),
            radial-gradient(ellipse 80% 80% at 50% 10%, rgba(59, 130, 246, 0.06), transparent 50%),
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

        {/* main grid: left profile sticky visual, right profile story details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Portrait Sticky Image Frame (4 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <FadeIn y={30} delay={0.1} className="relative">
              {/* Subtle background glow */}
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 blur-2xl pointer-events-none" />

              {/* Portrait frame */}
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] bg-[#0C0C0C]">
                <img
                  src="/me.jpg"
                  alt="Abrham — Creative Director & Editor"
                  loading="lazy"
                  className="w-full object-cover aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] object-center scale-100 hover:scale-[1.02] transition-transform duration-700"
                  style={{ objectPosition: "center 20%" }}
                />

                {/* Bottom dark overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                  <span className="text-[10px] text-white/40 tracking-widest uppercase mb-1 block">
                    FOUNDER & CREATIVE DIRECTOR
                  </span>
                  <h2
                    className="text-3xl text-white font-normal italic leading-none"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Abrham
                  </h2>
                  <p className="text-xs text-white/50 mt-1 font-light tracking-wide">
                    Crafting scroll-stopping visual scaling loops.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: Detailed Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-16">
            {/* Header / Intro */}
            <div>
              <FadeIn y={15} delay={0.05}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-white/20" />
                  <span className="text-[10px] text-white/40 tracking-widest uppercase">
                    The Profile
                  </span>
                </div>
              </FadeIn>

              <FadeIn y={25} delay={0.15}>
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] mb-8"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  I shape stories that scale{" "}
                  <span className="italic font-light text-white/85">
                    digital brands.
                  </span>
                </h1>
              </FadeIn>

              <FadeIn
                y={20}
                delay={0.2}
                className="space-y-6 text-white/60 font-light text-sm sm:text-base leading-relaxed"
              >
                <p>
                  Over the past six years, I have worked at the intersection of
                  video editing, cinematic motion design, and commercial
                  conversion strategy. My focus is simple: engineering content
                  that does not just look beautiful, but captures attention and
                  drives tangible growth.
                </p>
                <p>
                  I believe that modern editing is psychological. Pacing, audio
                  design, visual color grading, and timing are not merely
                  aesthetic choices—they are highly calculated variables that
                  control attention, invoke emotional resonance, and
                  dramatically reduce acquisition costs for modern DTC and B2B
                  brands.
                </p>
              </FadeIn>
            </div>

            {/* Creative Philosophy Row */}
            <FadeIn
              y={30}
              delay={0.25}
              className="p-6 md:p-8 rounded-[28px] border border-white/5 bg-[#080808]/60 backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <BriefcaseBusiness size={80} className="text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                <Compass className="text-purple-400" size={18} />
                Creative Philosophy
              </h3>
              <p className="text-sm text-white/55 leading-relaxed font-light">
                &ldquo;Every single frame must serve a purpose. We never cut
                just to cut. We slice to direct momentum, we color to evoke
                mood, and we design soundscapes to deliver a premium, premium
                brand connection.&rdquo;
              </p>
            </FadeIn>

            {/* Core Capabilities Section */}
            <div className="space-y-6">
              <FadeIn y={20} delay={0.1}>
                <h3 className="text-xs tracking-widest text-white/40 uppercase font-semibold border-b border-white/10 pb-4">
                  Core Capabilities
                </h3>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {capabilities.map((cap, index) => (
                  <FadeIn key={cap.title} y={15} delay={0.05 * index + 0.15}>
                    <div className="p-6 rounded-[24px] border border-white/5 bg-[#080808]/30 hover:border-white/10 hover:bg-[#0C0C0C]/50 transition-all duration-300 h-full flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        {cap.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">
                          {cap.title}
                        </h4>
                        <p className="text-xs text-white/40 leading-relaxed font-light">
                          {cap.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Growth Framework Focus */}
            <div className="space-y-6">
              <FadeIn y={20} delay={0.1}>
                <h3 className="text-xs tracking-widest text-white/40 uppercase font-semibold border-b border-white/10 pb-4">
                  Attention & Performance Framework
                </h3>
              </FadeIn>

              <div className="space-y-4">
                {frameworkMetrics.map((f, idx) => (
                  <FadeIn key={f.label} y={15} delay={0.05 * idx + 0.2}>
                    <div className="p-5 rounded-[20px] border border-white/5 bg-[#080808]/40 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-white/10 transition-colors duration-300">
                      <div className="flex gap-4 items-center">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                          {f.icon}
                        </div>
                        <div>
                          <span className="text-[10px] text-purple-400 font-mono tracking-widest block uppercase mb-0.5">
                            {f.label}
                          </span>
                          <h4 className="text-sm font-semibold text-white">
                            {f.metric}
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs text-white/40 max-w-sm sm:text-right font-light leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Let's connect button */}
            <FadeIn y={20} delay={0.3} className="pt-6">
              <a
                href="#contact"
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold tracking-widest uppercase text-black bg-white rounded-full hover:bg-white/90 group transition-all duration-300 cursor-pointer"
              >
                Start a conversation
                <ArrowUpRight
                  size={14}
                  className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
