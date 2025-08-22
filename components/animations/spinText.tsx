"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export default function SpinText({ text }: { text: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const chars = ref.current.querySelectorAll("span");

        animate(chars, {
            rotate: ["-1turn", 0],
            opacity: [0, 1],
            delay: stagger(100),
            duration: 1000,
            easing: "easeOutExpo",
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
