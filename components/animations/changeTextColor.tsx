"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export default function ColorCycleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll("span");

    animate(chars, {
      color: [{ to: "#ff0077" }, { to: "#00e0ff" }, { to: "#ffdd00" }],
      delay: stagger(100),
      loop: true,
      duration: 2000,
      easing: "easeInOutSine",
    });
  }, [text]);

  return (
    <span ref={ref} className="inline-block">
      {text.split("").map((c, i) => (
        <span key={i} className="inline-block">
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}
