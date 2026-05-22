import { Star } from "lucide-react";
import portfolioData from "../data/portfolioContent.json";
import FadeIn from "./FadeIn";

export default function Testimonials() {
  const { badge, title, list } = portfolioData.testimonials;

  // Duplicate list for seamless infinite scroll
  const duplicatedList = [...list, ...list];

  return (
    <section
      className="relative w-full bg-black text-white py-24 sm:py-32 overflow-hidden border-t border-white/5"
      id="testimonials"
    >
      {/* Cosmic Nebula Background Layer - Testimonials Theme */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          background: `
            radial-gradient(ellipse 110% 70% at 50% 50%, rgba(147, 51, 234, 0.08), transparent 60%),
            radial-gradient(ellipse 120% 60% at 15% 25%, rgba(16, 185, 129, 0.08), transparent 55%),
            radial-gradient(ellipse 90% 80% at 85% 75%, rgba(236, 72, 153, 0.08), transparent 50%),
            radial-gradient(ellipse 100% 50% at 80% 20%, rgba(59, 130, 246, 0.06), transparent 45%),
            #000000
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <FadeIn y={20} delay={0.05}>
            <span className="text-xs uppercase tracking-widest text-white/50 mb-8 border border-white/20 px-3 py-1 rounded-full inline-block">
              {badge}
            </span>
          </FadeIn>

          <FadeIn y={25} delay={0.15}>
            <h2
              className="text-4xl md:text-5xl font-normal tracking-tight"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              {title}
            </h2>
          </FadeIn>
        </div>
      </div>

      {/* Horizontal auto-scrolling carousel */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Fade edges for depth */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 sm:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-6 w-max items-start animate-[marquee-scroll_40s_linear_infinite] hover:[animation-play-state:paused]"
          style={{
            padding: "0 3rem",
          }}
        >
          {duplicatedList.map((item, idx) => (
            <div
              key={`${item.author}-${idx}`}
              className="w-[380px] sm:w-[420px] shrink-0 bg-[#141414] rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-white/10 transition-colors duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill="#34d399"
                      className="text-emerald-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="text-lg leading-relaxed text-white/80"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  "{item.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.author}
                    loading="lazy"
                    className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-[11px] font-bold text-green-400 uppercase shrink-0">
                    {item.initials}
                  </div>
                )}
                <div>
                  <div className="font-medium text-sm text-white">
                    {item.author}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframe for marquee scroll */}
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
