import { useEffect, useState, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutProjects from "./components/AboutProjects";
import Testimonials from "./components/Testimonials";
import FooterCta from "./components/FooterCta";
import Footer from "./components/Footer";

const ChartSection = lazy(() => import("./components/ChartSection"));
const ProjectsPage = lazy(() => import("./components/ProjectsPage"));
const AboutMePage = lazy(() => import("./components/AboutMePage"));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      ScrollTrigger.refresh();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-clip select-none font-sans">
      <Navbar />

      {currentPath === "/projects" ? (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <ProjectsPage />
        </Suspense>
      ) : currentPath === "/me" ? (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <AboutMePage />
        </Suspense>
      ) : (
        <>
          <HeroSection />
          <Suspense fallback={<div className="h-[400px] bg-black flex items-center justify-center text-white/10">Loading performance data...</div>}>
            <ChartSection />
          </Suspense>
          <AboutProjects />
          <Testimonials />
          <FooterCta />
        </>
      )}

      <Footer />
    </div>
  );
}
