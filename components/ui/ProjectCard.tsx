"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  role?: string;
  impact: string;
  metrics?: { value: string; label: string }[];
  description: string;
  highlights?: string[];
  problem?: string;
  bullets?: string[];
  tech: string[];
  images?: { src: string; alt: string; objectPosition?: string }[];
  link?: string;
  linkLabel?: string;
  accentColor: string;
  location: string;
  delay?: number;
  featured?: boolean;
  index?: number;
}

export default function ProjectCard({
  title,
  role,
  impact,
  metrics = [],
  description,
  highlights = [],
  problem,
  bullets = [],
  tech,
  images = [],
  link,
  linkLabel = "View Project",
  accentColor,
  location,
  delay = 0,
  featured = false,
  index,
}: ProjectCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const prevImg = () => setImgIndex((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setImgIndex((i) => (i + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-bg-card rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.12] md:grid md:grid-cols-[1.08fr_0.92fr]"
      style={{ boxShadow: "0 1px 0 0 rgba(255,255,255,0.04) inset" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${accentColor}18, 0 1px 0 0 rgba(255,255,255,0.04) inset`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 0 0 rgba(255,255,255,0.04) inset";
      }}
    >
      {/* Accent line */}
      <div
        className="absolute top-0 inset-x-0 h-[1.5px] z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}90 35%, ${accentColor}90 65%, transparent)`,
        }}
      />

      {/* ── Image Gallery ── */}
      {images.length > 0 && (
        <div
          className="relative w-full overflow-hidden bg-black/30 flex-shrink-0 h-[420px] md:h-full md:min-h-[560px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={imgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0"
            >
              <Image
                src={images[imgIndex].src}
                alt={images[imgIndex].alt}
                fill
                priority={imgIndex === 0}
                className="object-cover"
                style={{ objectPosition: images[imgIndex].objectPosition ?? "top" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent" />
              {/* Hover accent tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 100%, ${accentColor}10, transparent 60%)` }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows — appear on hover */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all duration-200 hover:scale-110"
              >
                <ChevronRight size={15} />
              </button>

              {/* Pill dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === imgIndex ? 20 : 6,
                      background: i === imgIndex ? accentColor : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>

              {/* Counter badge */}
              <div className="absolute top-3 right-3 z-20 font-code text-[10px] text-white/60 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {imgIndex + 1} / {images.length}
              </div>
            </>
          )}

          <div className="absolute left-4 bottom-4 right-4 z-20 hidden md:block">
              <div className="rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-4">
                <p className="font-code text-[10px] uppercase tracking-[0.2em] text-white/45 mb-2">
                  {featured ? "Field Evidence" : "Project Artifact"}
                </p>
                <p className="text-sm leading-relaxed text-white/75">
                  {featured
                    ? "Actual mobile clinic deployment: the interface, the nurse, and the field workflow in the same frame."
                    : "Screens from the shipped product, docs, or production workflow behind this project."}
                </p>
              </div>
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div
          className="relative hidden md:flex min-h-[420px] items-center justify-center overflow-hidden bg-black/20"
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor}18, transparent 62%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent)`,
          }}
        >
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="absolute inset-16 rounded-full border border-white/[0.06]" />
          <div
            className="h-24 w-24 rounded-full border flex items-center justify-center font-display text-4xl"
            style={{ color: accentColor, borderColor: `${accentColor}35`, background: `${accentColor}08` }}
          >
            {typeof index === "number" ? String(index + 1).padStart(2, "0") : "→"}
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-6 md:p-8 lg:p-10">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {typeof index === "number" && (
                <span
                  className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-2 text-[10px] font-code"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}35`,
                    background: `${accentColor}10`,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span
                className="inline-block text-[10px] font-code px-2.5 py-0.5 rounded-full border"
                style={{
                  color: accentColor,
                  borderColor: `${accentColor}35`,
                  background: `${accentColor}10`,
                }}
              >
                {location}
              </span>
            </div>
            {role && (
              <p className="text-[11px] text-text-secondary/50 font-code mt-1.5 leading-tight">{role}</p>
            )}
          </div>
          {link && (
            <a
              href={link}
              target={link.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
              style={{ color: accentColor }}
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-3xl md:text-4xl text-text-primary leading-snug mb-2">
          {title}
        </h3>

        {/* Impact — always prominent */}
        <p
          className="font-code text-[11px] uppercase tracking-wider mb-4 leading-relaxed"
          style={{ color: accentColor }}
        >
          {impact}
        </p>

        {metrics.length > 0 && (
          <div className={`grid gap-px rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.06] mb-5 ${
            metrics.length >= 3 ? "grid-cols-3" : "grid-cols-2"
          }`}>
            {metrics.map((metric) => (
              <div key={`${metric.value}-${metric.label}`} className="bg-bg-primary/80 px-3 py-3">
                <p className="font-display text-2xl leading-none" style={{ color: accentColor }}>
                  {metric.value}
                </p>
                <p className="font-code text-[9px] uppercase tracking-widest text-text-secondary/45 mt-1 leading-tight">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-[15px] text-text-secondary leading-relaxed mb-5">
          {description}
        </p>

        {/* Highlights — always visible key facts */}
        {highlights.length > 0 && (
          <div
            className="rounded-xl p-4 mb-5 space-y-2.5"
            style={{ background: `${accentColor}08`, border: `1px solid ${accentColor}18` }}
          >
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: accentColor }}
                />
                <p className="text-sm text-text-secondary leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        )}

        {/* Expandable: full story */}
        {(problem || bullets.length > 0) && (
          <div className="mb-5">
            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 text-xs font-code transition-all duration-200 hover:opacity-90 rounded-full border px-3 py-1.5"
              style={{ color: accentColor, borderColor: `${accentColor}28`, background: `${accentColor}08` }}
            >
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <ChevronDown size={13} />
              </motion.span>
              {expanded ? "Close case notes" : "Open case notes"}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-xl border p-4 space-y-4" style={{ borderColor: `${accentColor}20`, background: `${accentColor}05` }}>
                    {problem && (
                      <div>
                        <p className="text-[10px] font-code uppercase tracking-widest mb-1.5" style={{ color: `${accentColor}70` }}>
                          The Problem
                        </p>
                        <p className="text-text-secondary text-sm leading-relaxed">{problem}</p>
                      </div>
                    )}
                    {bullets.length > 0 && (
                      <div>
                        <p className="text-[10px] font-code uppercase tracking-widest mb-2.5" style={{ color: `${accentColor}70` }}>
                          Process & Decisions
                        </p>
                        <ul className="space-y-2.5">
                          {bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                              <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: accentColor }} />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Spacer pushes footer down */}
        <div className="flex-1" />

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-code px-2.5 py-0.5 rounded-md bg-white/[0.05] text-text-secondary/65 border border-white/[0.06]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        {link && (
          <a
            href={link}
            target={link.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-150 hover:gap-2.5"
            style={{ color: accentColor }}
          >
            {linkLabel}
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
