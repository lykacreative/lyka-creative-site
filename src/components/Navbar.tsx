import React, { useState, useEffect } from "react";
import portfolioData from "../data/portfolioContent.json";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { logo, links, darkModeBtn } = portfolioData.navbar;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const sectionId = href.substring(1);
      
      if (window.location.pathname !== "/") {
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new Event("popstate"));
        
        setTimeout(() => {
          if (sectionId === "") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      } else {
        if (sectionId === "") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-black/60 backdrop-blur-xl py-4 border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-8 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname !== "/") {
                  window.history.pushState({}, "", "/");
                  window.dispatchEvent(new Event("popstate"));
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="select-none cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3000 3000"
                className="w-10 h-10"
              >
                <defs>
                  <style>
                    {`.logo-circle { fill: red; } .logo-ring { fill: none; stroke: #fff; stroke-width: 300px; fill-rule: evenodd; }`}
                  </style>
                </defs>
                <circle className="logo-circle" cx="1500" cy="1500" r="900" />
                <path
                  className="logo-ring"
                  d="M1500-1360C2245.58-1360,2850-750.883,2850,.5S2245.58,1361,1500,1361,150,751.883,150,.5,754.416-1360,1500-1360Z"
                />
                <path
                  className="logo-ring"
                  d="M1500,1640c745.58,0,1350,609.12,1350,1360.5S2245.58,4361,1500,4361,150,3751.88,150,3000.5,754.416,1640,1500,1640Z"
                />
              </svg>
            </a>
            <div className="text-2xl font-bold tracking-tighter text-white hidden sm:block">
              {logo}
            </div>{" "}
          </div>

          {/* Desktop Menu Links - Positioned at top right */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[12px] font-semibold tracking-[0.1em] uppercase text-white/70 hover:text-white transition-colors duration-300"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu toggle button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[6px]" : "-translate-y-1"}`}
            ></span>
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 absolute ${isOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[6px]" : "translate-y-1"}`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center items-center ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 text-center">
          {links.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                setIsOpen(false);
                handleLinkClick(e, link.href);
              }}
              className={`text-3xl font-bold uppercase tracking-widest text-white/80 hover:text-white transition-all duration-300 transform ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
          {/* Theme button removed */}
        </div>
      </div>
    </>
  );
}
