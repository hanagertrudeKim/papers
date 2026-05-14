"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  style,
}: CounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, to, {
            duration,
            ease: "easeOut",
            onUpdate(value) {
              node.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
            },
          });
          observer.disconnect();
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to, duration, suffix, prefix, hasAnimated]);

  return (
    <span ref={nodeRef} className={className} style={style}>
      {prefix}0{suffix}
    </span>
  );
}
