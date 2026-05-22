import { useRef, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import FadeIn from "./FadeIn";
import portfolioData from "../data/portfolioContent.json";

// ─── Animated annotation dot ─────────────────────────────────────────────────
const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload.annotation)
    return <circle cx={cx} cy={cy} r={4} fill="#2F852A" />;

  return (
    <svg x={cx - 10} y={cy - 10} className="overflow-visible">
      <circle cx={10} cy={10} r={5} fill="#2F852A" stroke="#E6F4EA" strokeWidth={3} />
      <foreignObject x="-60" y="-45" width="120" height="40" className="overflow-visible">
        <div className="bg-[#E6F4EA] text-[#2F852A] text-[10px] font-medium px-2 py-1 rounded-md text-center shadow-sm leading-tight inline-block whitespace-nowrap">
          {payload.annotation}
        </div>
      </foreignObject>
    </svg>
  );
};

// ─── Hook: fires only when the element itself is well into view ──────────────
// threshold: fraction of the element that must be visible before triggering.
// rootMargin crops the effective viewport so the trigger zone is tighter.
function useInView(threshold = 0.6, rootMargin = "0px") {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ChartSection() {
  const { badge, titleMain, titleItalic, description } = portfolioData.performanceText;
  const { chartData, cpaData, convData, mainCard, cpaCard, convCard } = portfolioData.performanceGraph;
  const { features } = portfolioData.textAfterGraph;

  // Observe only the center card — fires when it's 60% visible.
  // This prevents the animation triggering from the heading or features grid.
  const { ref: centerCardRef, inView } = useInView(0.6, "-5% 0px");

  // Counter increments only when the center card *enters* view.
  // Charts remount (replaying animation) on each entry but hold their
  // final drawn state while out of view — no blank-chart flicker.
  const [animCount, setAnimCount] = useState(0);
  useEffect(() => {
    if (inView) setAnimCount((c) => c + 1);
  }, [inView]);
  const animKey = animCount;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full bg-black text-white py-24 flex flex-col items-center overflow-hidden">
      {/* Cosmic Nebula Background Layer - Performance/Emerald Theme */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 60% at 80% 20%, rgba(16, 185, 129, 0.12), transparent 60%),
            radial-gradient(ellipse 100% 70% at 15% 80%, rgba(59, 130, 246, 0.10), transparent 55%),
            radial-gradient(ellipse 90% 80% at 70% 80%, rgba(147, 51, 234, 0.08), transparent 50%),
            radial-gradient(ellipse 110% 50% at 30% 25%, rgba(236, 72, 153, 0.06), transparent 45%),
            #000000
          `,
        }}
      />

      <div className="relative z-10 max-w-[1400px] w-full px-6 flex flex-col items-center xl:items-start text-center xl:text-left">

        {/* Heading */}
        <div className="mb-16 w-full flex flex-col items-center">
          <FadeIn y={25}>
            <span className="text-xs uppercase tracking-widest text-[#a6a6a6] mb-4 border border-white/10 px-3 py-1 rounded-full">
              {badge}
            </span>
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h2
              className="text-4xl text-center sm:text-5xl lg:text-7xl font-medium tracking-tight mb-4 mt-4 leading-[1.05]"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
            >
              {titleMain} <br className="hidden sm:block" />
              <span>{titleItalic}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} y={20}>
            <p className="mt-4 text-lg text-white/60 font-light" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {description}
            </p>
          </FadeIn>
        </div>

        {/* ── Chart block ── */}
        <div className="relative w-full h-[600px] md:h-[550px] mt-8 flex items-center justify-center">
          {/* Left card: CPA */}
          <div className="hidden lg:flex absolute left-[3%] w-[350px] h-[400px] bg-[#f8f9fa] rounded-3xl z-10 -translate-x-12 opacity-90 scale-95 lg:hover:z-30 lg:hover:scale-100 lg:hover:opacity-100 lg:hover:translate-x-0 transition-all duration-200 lg:hover:duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex-col p-6 text-black shadow-xl shadow-black/50 border border-black/5">
            <h3 className="font-medium text-lg">{cpaCard.title}</h3>
            <p className="text-xs text-black/50 mb-3">{cpaCard.subtitle}</p>
            <div className="text-4xl font-normal tracking-tight">{cpaCard.value}</div>
            <div className="text-xs font-medium text-black/60 mt-1">{cpaCard.change}</div>
            <div key={`cpa-${animKey}`} className="flex-1 mt-6 w-full h-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cpaData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <YAxis domain={[0, 40]} hide />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#A0AEC0" }} axisLine={false} tickLine={false} interval="preserveStartEnd" minTickGap={20} />
                  <Line
                    type="monotone" dataKey="value" stroke="#718096" strokeWidth={2} dot={false}
                    isAnimationActive={inView}
                    animationDuration={1200} animationEasing="ease-out" animationBegin={0}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right card: Conversion Rate */}
          <div className="hidden lg:flex absolute right-[3%] w-[350px] h-[400px] bg-[#f8f9fa] rounded-3xl z-10 translate-x-12 opacity-90 scale-95 lg:hover:z-30 lg:hover:scale-100 lg:hover:opacity-100 lg:hover:translate-x-0 transition-all duration-200 lg:hover:duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex-col p-6 text-black shadow-xl shadow-black/50 border border-black/5">
            <h3 className="font-medium text-lg">{convCard.title}</h3>
            <div className="text-4xl font-normal tracking-tight mt-3">{convCard.value}</div>
            <div className="text-xs font-medium text-black/60 mt-1">{convCard.change}</div>
            <div key={`conv-${animKey}`} className="flex-1 mt-10 w-full h-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={convData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <YAxis domain={[0, 4]} hide />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#A0AEC0" }} axisLine={false} tickLine={false} interval="preserveStartEnd" minTickGap={20} />
                  <Line
                    type="monotone" dataKey="value" stroke="#718096" strokeWidth={2} dot={false}
                    isAnimationActive={inView}
                    animationDuration={1400} animationEasing="ease-out" animationBegin={150}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Center main card — observer ref lives here so animation only fires
               when this specific card is 60%+ visible in the viewport */}
          <div ref={centerCardRef} className="relative z-10 w-full max-w-[850px] h-full sm:h-[500px] bg-[#f8f9fa] rounded-[2rem] shadow-2xl p-6 md:p-8 flex flex-col sm:flex-row text-black border border-black/5">
            <div className="w-full sm:w-[200px] flex flex-col justify-between pr-4 pb-6 sm:pb-0 sm:border-r border-black/5">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="font-medium text-lg hidden sm:block">{mainCard.title}</h3>
                  <h3 className="font-medium text-lg sm:hidden">Lyka Creative</h3>
                </div>
                <span className="hidden sm:inline-block text-[10px] bg-[#E6F4EA] text-[#2F852A] px-2 py-1 rounded-full whitespace-nowrap mb-8 font-medium">
                  {mainCard.badge}
                </span>
                <div className="mb-6 flex flex-row sm:flex-col justify-between sm:justify-start">
                  {mainCard.metrics.map((metric, i) => (
                    <div key={metric.label} className={i > 0 ? "flex-1 sm:mt-6 hidden md:block" : "flex-1"}>
                      <p className="text-xs text-black/50 mb-1">{metric.label}</p>
                      <div className="text-3xl font-medium text-[#2F852A]">{metric.value}</div>
                      <div className="text-[10px] font-medium text-[#2F852A] mt-1">{metric.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 h-[300px] sm:h-full w-full sm:-ml-2 pt-8 sm:pt-4">
              <div className="absolute top-8 right-8 hidden sm:flex items-center gap-4 text-xs font-medium text-black/60">
                <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-[#2F852A]" />ROAS</div>
                <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-[#4A5568]" />Ad Spend</div>
              </div>
              <div key={`main-${animKey}`} className="w-full h-full pr-0 sm:pr-4 text-xs font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: isMobile ? 0 : 10, left: isMobile ? -15 : 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#A0AEC0" }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis yAxisId="left" domain={[0, 8]} ticks={[0, 2, 4, 6, 8]} tickFormatter={(val) => `${val}x`} tick={{ fontSize: 10, fill: "#A0AEC0" }} axisLine={false} tickLine={false} width={isMobile ? 24 : 32} dx={isMobile ? -2 : -8} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 80]} ticks={[0, 20, 40, 60, 80]} tickFormatter={(val) => `$${val}K`} tick={{ fontSize: 10, fill: "#A0AEC0" }} axisLine={false} tickLine={false} width={isMobile ? 36 : 46} dx={isMobile ? 2 : 8} />
                    <Line
                      yAxisId="left" type="monotone" dataKey="roas"
                      stroke="#2F852A" strokeWidth={3} dot={<CustomizedDot />} activeDot={{ r: 6 }}
                      isAnimationActive={inView}
                      animationDuration={1600} animationEasing="ease-out" animationBegin={0}
                    />
                    <Line
                      yAxisId="right" type="monotone" dataKey="spend"
                      stroke="#4A5568" strokeWidth={2} dot={{ r: 4, fill: "#4A5568", strokeWidth: 0 }} activeDot={{ r: 6 }}
                      isAnimationActive={inView}
                      animationDuration={1800} animationEasing="ease-out" animationBegin={200}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-24 lg:max-w-[90%] mx-auto">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} y={20} delay={0.05 + i * 0.1}>
              <div className="border-t border-white/10 pt-6">
                <h4 className="text-lg font-medium mb-3 text-white">{feature.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {feature.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
