"use client";
import React from "react";
import {
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Define the props interface for the Button component
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> { // Extends standard button props
    borderRadius?: string;
    children: React.ReactNode;
    as?: React.ElementType; // Use React.ElementType for 'as' prop
    containerClassName?: string;
    borderClassName?: string;
    duration?: number;
    className?: string;
}

export function Button({
    borderRadius = "1.75rem",
    children,
    as: Component = "button",
    containerClassName,
    borderClassName,
    duration,
    className,
    ...otherProps
}: ButtonProps) { // Use the defined interface here
    return (
        <Component
            className={cn(
                "relative md:col-span-2 overflow-hidden bg-transparent p-[1px] text-xl",
                containerClassName,
            )}
            style={{
                borderRadius: borderRadius,
            }}
            {...otherProps}
        >
            <div
                className="absolute inset-0"
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                <MovingBorder duration={duration} rx="30%" ry="30%">
                    <div
                        className={cn(
                            "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
                            borderClassName,
                        )}
                    />
                </MovingBorder>
            </div>

            <div
                className={cn(
                    "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
                    className,
                )}
                style={{
                    borderRadius: `calc(${borderRadius} * 0.96)`,
                }}
            >
                {children}
            </div>
        </Component>
    );
}

// Define the props interface for MovingBorder
interface MovingBorderProps extends React.SVGProps<SVGSVGElement> { // Extends SVG props for the outer SVG
    children: React.ReactNode;
    duration?: number;
    rx?: string;
    ry?: string;
    // No need for [key: string]: any; if you extend SVGProps properly
}

export const MovingBorder = ({
    children,
    duration = 3000,
    rx,
    ry,
    ...otherProps
}: MovingBorderProps) => { // Use the defined interface here
    // Correctly type the useRef for the SVGPathElement (for rect inside SVG)
    const pathRef = useRef<SVGRectElement>(null);
    const progress = useMotionValue<number>(0);

    useAnimationFrame((time) => {
        // Ensure pathRef.current is not null and has getTotalLength method
        const length = pathRef.current?.getTotalLength?.();
        if (length) {
            const pxPerMillisecond = length / duration;
            progress.set((time * pxPerMillisecond) % length);
        }
    });

    const x = useTransform(
        progress,
        (val) => {
            // Ensure pathRef.current is not null before accessing getPointAtLength
            const point = pathRef.current?.getPointAtLength?.(val);
            return point ? point.x : 0; // Return 0 or handle null case appropriately
        },
    );
    const y = useTransform(
        progress,
        (val) => {
            // Ensure pathRef.current is not null before accessing getPointAtLength
            const point = pathRef.current?.getPointAtLength?.(val);
            return point ? point.y : 0; // Return 0 or handle null case appropriately
        },
    );

    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="absolute h-full w-full"
                width="100%"
                height="100%"
                {...otherProps} // This should be fine as it's passed to SVG
            >
                <rect
                    fill="none"
                    width="100%"
                    height="100%"
                    rx={rx}
                    ry={ry}
                    ref={pathRef} // pathRef is now correctly typed as SVGRectElement
                />
            </svg>
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "inline-block",
                    transform,
                }}
            >
                {children}
            </motion.div>
        </>
    );
};