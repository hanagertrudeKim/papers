"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Mail } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Timeline", href: "#timeline" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Name */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-display text-lg text-text-primary hover:text-white transition-colors"
        >
          Hana Kim
        </a>

        {/* Nav links + CTA */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector(link.href);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="mailto:rlagksk8428@gmail.com"
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-korea/30 bg-korea/5 hover:bg-korea/10 text-korea transition-all"
          >
            <Mail size={13} />
            Contact
          </a>
        </div>
      </div>
    </motion.header>
  );
}
