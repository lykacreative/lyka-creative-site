import { useEffect } from "react";

interface MetaContent {
  title: string;
  description: string;
  canonicalUrl: string;
}

const METADATA_MAP: Record<string, MetaContent> = {
  "/": {
    title: "Lyka Creative | Scroll-Stopping UGC & Video Production",
    description: "We craft stories, you build brands. Premium video editing, motion design, and managerial services for skincare brands, social media UGC, and brand films.",
    canonicalUrl: "https://lykacreative.com",
  },
  "/projects": {
    title: "Selected Work | Lyka Creative UGC Portfolio",
    description: "Explore the selected client work and personal motion design projects by Lyka Creative, featuring custom skincare UGC, VFX, and brand animations.",
    canonicalUrl: "https://lykacreative.com/projects",
  },
  "/me": {
    title: "About Abrham | Video Editor & Motion Designer",
    description: "Get to know Abrham, the creative driving force behind Lyka Creative. With over six years of experience crafting scroll-stopping video UGC and motion design.",
    canonicalUrl: "https://lykacreative.com/me",
  },
};

export default function useSEO(currentPath: string) {
  useEffect(() => {
    // Resolve metadata config based on current path, fallback to Home ("/") metadata
    const metadata = METADATA_MAP[currentPath] || METADATA_MAP["/"];

    // Update document title
    document.title = metadata.title;

    // Helper to update or create a meta tag helper
    const updateMetaTag = (selector: string, attributeName: string, attributeValue: string, contentValue: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // Update Meta Description
    updateMetaTag('meta[name="description"]', "name", "description", metadata.description);

    // Update Open Graph (OG) Tags
    updateMetaTag('meta[property="og:title"]', "property", "og:title", metadata.title);
    updateMetaTag('meta[property="og:description"]', "property", "og:description", metadata.description);
    updateMetaTag('meta[property="og:url"]', "property", "og:url", metadata.canonicalUrl);

    // Update Twitter Cards Tags
    updateMetaTag('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    updateMetaTag('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);
    updateMetaTag('meta[name="twitter:url"]', "name", "twitter:url", metadata.canonicalUrl);

    // Update Canonical Link Linkage
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", metadata.canonicalUrl);
  }, [currentPath]);
}
