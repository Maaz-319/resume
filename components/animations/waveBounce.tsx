"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export default function WaveText({
  text_to_animate,
}: {
  text_to_animate: string;
}) {
  const headingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    // Grab all spans inside heading
    const chars = headingRef.current.querySelectorAll("span");

    // Animate
    animate(chars, {
      y: [
        { to: "-1rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: stagger(50),
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: true,
    });
  }, [text_to_animate]);

  return (
    <span ref={headingRef} className="inline-block">
      {text_to_animate.split("").map((char, i) => (
        <span key={i} className="inline-block">
          {char === "/" ? "\u00A0👋" : char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
