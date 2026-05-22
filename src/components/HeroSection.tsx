import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Play,
  Circle,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Pause,
  Sparkles,
} from "lucide-react";
import portfolioData from "../data/portfolioContent.json";
import InteractiveGrid from "./InteractiveGrid";

interface FrameData {
  id: string;
  type: string;
  title: string;
  creator: string;
  videoUrl: string;
  likes: string;
  comments: string;
  shares: string;
  depth: number;
  tiltMultiplier: number;
  scale: number;
  zIndex: number;
  position: { left: string; top: string };
}

export default function HeroSection() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const targetScrollProgress = useRef(0);
  const currentScrollProgress = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mutedStates, setMutedStates] = useState<boolean[]>([true, true]);
  const [likeStates, setLikeStates] = useState<boolean[]>([false, false]);
  const [isPlayingStates, setIsPlayingStates] = useState<boolean[]>([
    true,
    true,
  ]);
  const [flashState, setFlashState] = useState<{
    index: number;
    type: "play" | "pause";
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const {
    badgeText,
    headlineMain,
    headlineSub,
    description,
    ctaWorkText,
    ctaContactText,
  } = portfolioData.hero;
  const { frames } = portfolioData.heroEffect as { frames: FrameData[] };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll Trigger animation for fading text out on scroll
  useEffect(() => {
    if (heroTextRef.current) {
      gsap.to(heroTextRef.current, {
        opacity: 0,
        y: -55,
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: "top 20%",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  // Check viewports for responsive design choices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D Parallax & LERP loop
  useEffect(() => {
    if (isMobile) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Relative center coordinates ranging from -0.5 to 0.5
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      targetMouse.current = { x, y };
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height || 800;
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + sectionHeight);
      targetScrollProgress.current = Math.max(0, Math.min(1, progress));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // LERP animation loop
    const updatePhysics = () => {
      // Smooth interpolation for mouse movements
      currentMouse.current.x +=
        (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y +=
        (targetMouse.current.y - currentMouse.current.y) * 0.08;

      // Smooth interpolation for scroll drift
      currentScrollProgress.current +=
        (targetScrollProgress.current - currentScrollProgress.current) * 0.08;

      const mx = currentMouse.current.x;
      const my = currentMouse.current.y;
      const sp = currentScrollProgress.current - 0.5; // Offset from center scroll progress

      frames.forEach((frame, index) => {
        const frameEl = frameRefs.current[index];
        if (!frameEl) return;

        // Horizontally drift relative to cursor and multiplier
        const tx = mx * frame.tiltMultiplier * 3.5;
        // Vertically drift combining mouse and scroll progress layer depth
        const scrollShift = sp * 220 * (frame.depth - 0.7);
        const ty = my * frame.tiltMultiplier * 3.5 + scrollShift;

        // 3D rotations based on mouse tilt sensitivity
        const rx = -my * frame.tiltMultiplier;
        const ry = mx * frame.tiltMultiplier;
        const rz = mx * 2.5; // Tiny roll shift

        // Z depth placement inside 3D perspective field
        const tz = (frame.depth - 0.7) * 150;

        // Scale boost on hover state
        const scaleBoost = activeIndex === index ? 1.05 : 1.0;

        frameEl.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${frame.scale * scaleBoost})`;
      });

      animationFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isMobile, frames, activeIndex]);

  // Toggle video playback play/pause
  const togglePlayback = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlayingStates((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
      setFlashState({ index, type: "play" });
    } else {
      video.pause();
      setIsPlayingStates((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
      setFlashState({ index, type: "pause" });
    }

    setTimeout(() => {
      setFlashState(null);
    }, 600);
  };

  // Toggle video sound mute/unmute
  const toggleMute = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMutedStates((prev) => {
      const next = [...prev];
      next[index] = nextMuted;
      return next;
    });

    if (!nextMuted && video.paused) {
      video.play().catch(() => {});
      setIsPlayingStates((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }
  };

  // Handle heart like widget
  const handleLike = (index: number) => {
    setLikeStates((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-start items-center pt-[28vh] xl:pt-[24vh] 2xl:pt-[30vh] pb-14 px-0 sm:px-4 overflow-hidden bg-black z-10"
    >
      {/* 1. Cosmic Nebula Background Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          background: `
            radial-gradient(ellipse 110% 70% at 25% 80%, rgba(147, 51, 234, 0.12), transparent 55%),
            radial-gradient(ellipse 130% 60% at 75% 15%, rgba(59, 130, 246, 0.10), transparent 65%),
            radial-gradient(ellipse 80% 90% at 20% 30%, rgba(236, 72, 153, 0.14), transparent 50%),
            radial-gradient(ellipse 100% 40% at 60% 70%, rgba(16, 185, 129, 0.08), transparent 45%),
            #000000
          `,
        }}
      />

      {/* 2. Slow Rotating Concentric Vector Rings (Adds motion depth over the nebula) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-20">
        <div
          className="absolute w-[950px] h-[950px] rounded-full border border-white/5 border-dashed animate-[spin_200s_linear_infinite]"
          style={{ transformOrigin: "center" }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full border border-white/5 animate-[spin_150s_linear_infinite_reverse]"
          style={{ transformOrigin: "center" }}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full border border-white/5 border-dashed animate-[spin_100s_linear_infinite]"
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* 3. Interactive Dot Canvas Background (Renders fixed over the nebula layers) */}
      <InteractiveGrid />

      {/* XL+ 3D FLOATING DEVICES CANVAS - Absolute overlays (screens >= 1280px) */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none z-5 overflow-hidden flex justify-center"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          <div
            className="relative w-full max-w-[1400px] h-full mx-auto"
            style={{ transformStyle: "preserve-3d" }}
          >
            {frames.map((frame, index) => (
              <div
                key={frame.id}
                ref={(el) => {
                  if (el) frameRefs.current[index] = el;
                }}
                className="absolute will-change-transform pointer-events-auto cursor-pointer"
                style={{
                  left: frame.position.left,
                  top: frame.position.top,
                  zIndex: activeIndex === index ? 50 : frame.zIndex,
                  transformStyle: "preserve-3d",
                  transition:
                    activeIndex === index
                      ? "z-index 0s, box-shadow 0.3s border-color 0.3s"
                      : "transform 0.15s ease-out, z-index 0.3s, box-shadow 0.3s, border-color 0.3s",
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => togglePlayback(index)}
              >
                {/* Premium Phone framework */}
                <div
                  className={`relative h-[460px] w-[220px] rounded-[36px] p-2 bg-[#0c0c0c] border-[5px] transition-all duration-500 overflow-hidden ${
                    activeIndex === index
                      ? "border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                      : "border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                  }`}
                >
                  {/* Screen clip */}
                  <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black select-none">
                    {/* Video Node */}
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[index] = el;
                      }}
                      src={frame.videoUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                      loop
                      muted={mutedStates[index]}
                      playsInline
                      autoPlay
                    />

                    {/* Glass Glare Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10" />

                    {/* Notch Pill Cutout */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-15 h-3 bg-black rounded-full z-30 flex items-center justify-between px-2">
                      <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full animate-pulse" />
                      <div className="w-4 h-1 bg-neutral-800 rounded-full" />
                    </div>

                    {/* Home Line Indicator */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30 rounded-full z-30" />

                    {/* Play/Pause Flashing indicator */}
                    {flashState && flashState.index === index && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 animate-fade-out">
                        <div className="p-4 rounded-full bg-black/60 text-white animate-ping-once">
                          {flashState.type === "play" ? (
                            <Play size={20} fill="currentColor" />
                          ) : (
                            <Pause size={20} fill="currentColor" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Pulsing sound waves */}
                    {isPlayingStates[index] && (
                      <div className="absolute bottom-20 left-4 z-25 flex items-end gap-[1.5px] h-3.5">
                        <span className="w-[1.5px] h-1.5 bg-emerald-400 rounded-sm animate-[bounce-bar_0.8s_ease-in-out_infinite]" />
                        <span className="w-[1.5px] h-3.5 bg-emerald-400 rounded-sm animate-[bounce-bar_0.6s_ease-in-out_infinite_0.2s]" />
                        <span className="w-[1.5px] h-2 bg-emerald-400 rounded-sm animate-[bounce-bar_0.7s_ease-in-out_infinite_0.4s]" />
                      </div>
                    )}

                    {/* Floating Action Badges */}
                    <div className="absolute top-6 left-3.5 z-25 flex items-center gap-1 bg-black/45 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[7.5px] font-bold text-white uppercase">
                        {frame.type}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute(index);
                      }}
                      className="absolute top-6 right-3.5 z-25 p-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/5 text-white hover:bg-black/60 transition-colors"
                    >
                      {mutedStates[index] ? (
                        <VolumeX size={9} />
                      ) : (
                        <Volume2 size={9} />
                      )}
                    </button>

                    {/* UGC Creator Tag overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 flex flex-col pointer-events-none">
                      <div className="text-left">
                        <p className="text-[10px] font-semibold text-white tracking-wide">
                          {frame.creator}
                        </p>
                        <p className="text-[9px] text-white/80 line-clamp-2 mt-0.5 font-light leading-snug">
                          {frame.title}
                        </p>

                        {/* Scrolling audio information */}
                        <div className="flex items-center gap-1 mt-1.5 overflow-hidden w-[130px]">
                          <span className="text-[8.5px] text-white/50 animate-pulse">
                            🎵
                          </span>
                          <div className="text-[8.5px] text-white/50 whitespace-nowrap overflow-hidden inline-block relative w-full font-light">
                            <span className="inline-block animate-[marquee_8s_linear_infinite]">
                              Original Audio - {frame.creator}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar engagement action list */}
                    <div className="absolute right-2 bottom-14 z-25 flex flex-col gap-3.5 items-center pointer-events-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(index);
                        }}
                        className="pointer-events-auto flex flex-col items-center gap-0.5 group"
                      >
                        <div className="p-1.5 rounded-full bg-black/50 border border-white/10 text-white group-hover:scale-115 active:scale-90 transition-transform">
                          <Heart
                            size={11}
                            fill={likeStates[index] ? "#ef4444" : "none"}
                            className={
                              likeStates[index]
                                ? "text-red-500 animate-heart-pop"
                                : "text-white"
                            }
                          />
                        </div>
                        <span className="text-[8px] font-medium text-white/70">
                          {likeStates[index] ? "Liked" : frame.likes}
                        </span>
                      </button>

                      <div className="flex flex-col items-center gap-0.5">
                        <div className="p-1.5 rounded-full bg-black/50 border border-white/10 text-white">
                          <MessageCircle size={11} />
                        </div>
                        <span className="text-[8px] font-medium text-white/70">
                          {frame.comments}
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-0.5">
                        <div className="p-1.5 rounded-full bg-black/50 border border-white/10 text-white">
                          <Share2 size={11} />
                        </div>
                        <span className="text-[8px] font-medium text-white/70">
                          {frame.shares}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Hero Headline content */}
      <div
        ref={heroTextRef}
        className="relative flex flex-col items-center text-center w-full z-30 pointer-events-auto"
      >
        <div className="flex items-center gap-2 border border-white/20 bg-black/25 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 sm:mb-12 shadow-[0_4px_20px_rgba(0,0,0,0.15)] select-none">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-white/90 uppercase drop-shadow-sm">
            {badgeText}
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 105px)",
            lineHeight: 1.05,
            fontFamily: "'Instrument Serif', serif",
          }}
          className="flex flex-col items-center text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)] mb-6 select-none"
        >
          <span className="font-normal">{headlineMain}</span>
          <span className="font-normal italic text-white/90">
            {headlineSub}
          </span>
        </h1>
      </div>

      {/* 5. Content details block */}
      <div
        className={`relative mt-auto w-full flex flex-col items-center pb-8 transition-all duration-1000 delay-300 px-0 sm:px-4 z-30 pointer-events-auto ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p
          className="max-w-[620px] text-[15px] sm:text-[17px] leading-relaxed text-center text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] mb-10 font-normal px-4"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {description}
        </p>

        <div className="w-full px-4 sm:px-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work"
            className="flex items-center justify-center gap-2 min-w-[200px] bg-white/5 border border-white/20 text-white text-[14px] font-semibold tracking-wider uppercase rounded-full px-8 py-3.5 transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:-translate-y-[1px] active:scale-[0.98] backdrop-blur-md shadow-lg cursor-pointer"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <Play size={14} fill="currentColor" className="text-green-400" />
            {ctaWorkText}
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 min-w-[200px] bg-white text-black border border-transparent text-[14px] font-semibold tracking-wider uppercase rounded-full px-8 py-3.5 transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-[1px] active:scale-[0.98] shadow-lg cursor-pointer"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <Circle
              size={8}
              fill="currentColor"
              strokeWidth={0}
              className="text-green-500 animate-ping"
            />
            {ctaContactText}
          </a>
        </div>

        {/* MOBILE FALLBACK SWIPE SLIDER - Commented out: device mockups only shown at xl+ (1280px) */}
        {/* {isMobile && ( ... mobile slider phone mockups ... )} */}
      </div>

    </section>
  );
}
