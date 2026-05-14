"use client";

import Counter from "@/components/ui/Counter";

const stats = [
  { value: 300, suffix: "+", label: "mothers tracked", color: "#FF6B6B" },
  { value: 6, suffix: "", label: "villages served", color: "#FF6B6B" },
  { value: 50, suffix: "+", label: "children sponsored", color: "#FFA500" },
  { value: 1000, suffix: "s", label: "DICOM files processed", color: "#3B82F6" },
  { value: 200, suffix: "", label: "engineers led", color: "#3B82F6" },
];

export default function ImpactSection() {
  return (
    <section className="border-y border-white/5 bg-bg-secondary/20">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-baseline gap-1.5">
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                className="font-display text-2xl font-medium"
                style={{ color: stat.color } as React.CSSProperties}
              />
              <span className="text-text-secondary text-sm">{stat.label}</span>
              {i < stats.length - 1 && (
                <span className="hidden md:inline ml-10 text-white/10">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
