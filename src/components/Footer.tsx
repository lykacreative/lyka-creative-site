import React from "react";
import portfolioData from "../data/portfolioContent.json";

export default function Footer() {
  const { title, description, copyright, builtWith, columns } =
    portfolioData.footer;

  const currentYear = new Date().getFullYear();
  const dynamicCopyright = copyright.replace(/\d{4}/, String(currentYear));

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
    <footer className="border-t border-white/10 bg-[#060606] pt-20 pb-10 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        {/* Brand — spans 2 cols */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
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
            <div className="text-2xl font-bold tracking-tighter text-white">
              {title}
            </div>
          </div>
          <p
            className="text-sm text-white/40 max-w-xs leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {description}
          </p>
        </div>

        {/* Nav columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-[10px] text-white/40 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
              {col.title}
            </h4>
            <ul className="space-y-3 font-light text-sm text-white/70">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[11px] text-white/40 uppercase tracking-wider space-y-4 md:space-y-0 pt-6 border-t border-white/10">
        <div>{dynamicCopyright}</div>
        <div>{builtWith}</div>
      </div>
    </footer>
  );
}
