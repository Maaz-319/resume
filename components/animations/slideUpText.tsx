"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export default function SlideUpText({ text }: { text: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const chars = ref.current.querySelectorAll("span");

        animate(chars, {
            translateY: [50, 0],
            opacity: [0, 1],
            delay: stagger(80),
            easing: "easeOutQuint",
            duration: 1200,
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
