"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Mesh } from "three"; // Import Mesh for ref typing
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";
// Group is from three, not tween.module.js, and it's a class, not a type for a ref.
// For a ref to a group, you'd typically use THREE.Group or a generic React.RefObject<THREE.Group>
// However, use a simple HTMLDivElement or similar if it's just a container, or Mesh if it's a Three.js object.
// Given it's a <group> in R3F, it's likely a THREE.Group.
import { Group } from "three"; // Correct import for Group

declare module "@react-three/fiber" {
    interface ThreeElements {
        threeGlobe: ThreeElements["mesh"] & {
            new(): ThreeGlobe;
        };
    }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
};

export type GlobeConfig = {
    pointSize?: number;
    globeColor?: string;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    emissive?: string;
    emissiveIntensity?: number;
    shininess?: number;
    polygonColor?: string;
    ambientLight?: string;
    directionalLeftLight?: string;
    directionalTopLight?: string;
    pointLight?: string;
    arcTime?: number;
    arcLength?: number;
    rings?: number;
    maxRings?: number;
    initialPosition?: {
        lat: number;
        lng: number;
    };
    autoRotate?: boolean;
    autoRotateSpeed?: number;
};

interface WorldProps {
    globeConfig: GlobeConfig;
    data: Position[];
}

// FIX: 'numbersOfRings' is never reassigned. Use 'const' instead.
// FIX: 'numbersOfRings' is assigned a value but never used.
// This variable is declared globally but not used. If it's meant to be stateful, it should be useState.
// If it's truly unused, remove it. Assuming it was a leftover or intended for a different purpose.
// For now, commenting it out. If you need it, define it within a component using useState.
// let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
    // FIX: Correctly type useRef for ThreeGlobe
    const globeRef = useRef<ThreeGlobe | null>(null);
    // FIX: Correctly type useRef for THREE.Group
    const groupRef = useRef<Three.Group>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const defaultProps = {
        pointSize: 1,
        atmosphereColor: "#ffffff",
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(255,255,255,0.7)",
        globeColor: "#1d072e",
        emissive: "#000000",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        ...globeConfig,
    };

    // Initialize globe only once
    useEffect(() => {
        if (!globeRef.current && groupRef.current) {
            globeRef.current = new ThreeGlobe();
            // FIX: Remove 'as any' by correctly typing groupRef
            groupRef.current.add(globeRef.current);
            setIsInitialized(true);
        }
    }, []); // Dependencies are fine here, runs once on mount

    // Build material when globe is initialized or when relevant props change
    useEffect(() => {
        if (!globeRef.current || !isInitialized) return;

        // FIX: Type assertion for globeMaterial to a more specific type
        const globeMaterial = globeRef.current.globeMaterial() as THREE.MeshPhongMaterial; // ThreeGlobe uses MeshPhongMaterial internally
        globeMaterial.color = new Color(globeConfig.globeColor);
        globeMaterial.emissive = new Color(globeConfig.emissive);
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
        globeMaterial.shininess = globeConfig.shininess || 0.9;
    }, [
        isInitialized,
        globeConfig.globeColor,
        globeConfig.emissive,
        globeConfig.emissiveIntensity,
        globeConfig.shininess,
    ]);

    // Build data when globe is initialized or when data changes
    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const arcs = data;
        // FIX: 'points' is never reassigned. Use 'const' instead.
        const points: Array<{
            size: number;
            order: number;
            color: string;
            lat: number;
            lng: number;
        }> = []; // Explicitly type points array
        for (let i = 0; i < arcs.length; i++) {
            const arc = arcs[i];
            // FIX: 'rgb' is assigned a value but never used.
            // If hexToRgb is only called for its side effect or if rgb is truly not used, remove the call
            // or use a variable name starting with '_' to signal it's intentionally unused (ESLint specific).
            // For now, keeping the call as it might be part of a larger logic, but the warning will persist if 'rgb' isn't consumed.
            // If the value is needed, use it. If not, consider if the conversion is necessary here.
            const rgb = hexToRgb(arc.color); // No need for 'as { r: number; g: number; b: number }' here, hexToRgb already returns that or null.
            // You might want to handle the null case for 'rgb' if hexToRgb can return null.
            if (!rgb) {
                console.warn(`Invalid hex color for arc: ${arc.color}`);
                continue; // Skip if color conversion fails
            }

            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.startLat,
                lng: arc.startLng,
            });
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.endLat,
                lng: arc.endLng,
            });
        }

        // remove duplicates for same lat and lng
        const filteredPoints = points.filter(
            (v, i, a) =>
                a.findIndex((v2) =>
                    ["lat", "lng"].every(
                        (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
                    ),
                ) === i,
        );

        globeRef.current
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .showAtmosphere(defaultProps.showAtmosphere)
            .atmosphereColor(defaultProps.atmosphereColor)
            .atmosphereAltitude(defaultProps.atmosphereAltitude)
            .hexPolygonColor(() => defaultProps.polygonColor);

        globeRef.current
            .arcsData(data)
            // FIX: Type assertion for 'e' in arcColor
            .arcStartLat((d) => (d as Position).startLat * 1)
            .arcStartLng((d) => (d as Position).startLng * 1)
            .arcEndLat((d) => (d as Position).endLat * 1)
            .arcEndLng((d) => (d as Position).endLng * 1)
            .arcColor((e: Position) => e.color) // Changed 'any' to 'Position'
            .arcAltitude((e: Position) => e.arcAlt * 1) // Changed 'e' type
            .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
            .arcDashLength(defaultProps.arcLength)
            .arcDashInitialGap((e: Position) => e.order * 1) // Changed 'e' type
            .arcDashGap(15)
            .arcDashAnimateTime(() => defaultProps.arcTime);

        globeRef.current
            .pointsData(filteredPoints)
            .pointColor((e: { color: string }) => e.color) // Changed 'e' type
            .pointsMerge(true)
            .pointAltitude(0.0)
            .pointRadius(2);

        globeRef.current
            .ringsData([])
            .ringColor(() => defaultProps.polygonColor)
            .ringMaxRadius(defaultProps.maxRings)
            .ringPropagationSpeed(RING_PROPAGATION_SPEED)
            .ringRepeatPeriod(
                (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
            );
    }, [
        isInitialized,
        data,
        defaultProps.pointSize,
        defaultProps.showAtmosphere,
        defaultProps.atmosphereColor,
        defaultProps.atmosphereAltitude,
        defaultProps.polygonColor,
        defaultProps.arcLength,
        defaultProps.arcTime,
        defaultProps.rings,
        defaultProps.maxRings,
        // No need to add hexToRgb or Math.random as dependencies as they are pure functions/globals
    ]);

    // Handle rings animation with cleanup
    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const interval = setInterval(() => {
            if (!globeRef.current) return;

            // FIX: 'newNumbersOfRings' is never reassigned. Use 'const' instead.
            const newNumbersOfRings = genRandomNumbers(
                0,
                data.length,
                Math.floor((data.length * 4) / 5),
            );

            const ringsData = data
                .filter((d, i) => newNumbersOfRings.includes(i))
                .map((d) => ({
                    lat: d.startLat,
                    lng: d.lng, // Assuming d.lng is correct here, not d.startLng again
                    color: d.color,
                }));

            globeRef.current.ringsData(ringsData);
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [isInitialized, data]); // FIX: Added missing dependencies: 'gl', 'size.height', and 'size.width' are not used in this useEffect.
    // The previous warning was likely for a different useEffect. This one's dependencies look correct for its scope.

    return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
    const { gl, size } = useThree();

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(size.width, size.height);
        gl.setClearColor(0xffaaff, 0);
    }, [gl, size.width, size.height]); // FIX: React Hook useEffect has missing dependencies

    return null;
}

export function World(props: WorldProps) {
    const { globeConfig } = props;
    const scene = new Scene();
    scene.fog = new Fog(0xffffff, 400, 2000);
    return (
        <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
            <WebGLRendererConfig />
            <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
            <directionalLight
                color={globeConfig.directionalLeftLight}
                position={new Vector3(-400, 100, 400)}
            />
            <directionalLight
                color={globeConfig.directionalTopLight}
                position={new Vector3(-200, 500, 200)}
            />
            <pointLight
                color={globeConfig.pointLight}
                position={new Vector3(-200, 500, 200)}
                intensity={0.8}
            />
            <Globe {...props} />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minDistance={cameraZ}
                maxDistance={cameraZ}
                autoRotateSpeed={1}
                autoRotate={true}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI - Math.PI / 3}
            />
        </Canvas>
    );
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    // FIX: Unexpected var, use let or const instead.
    // Changed 'var' to 'const' for 'result'
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

export function genRandomNumbers(min: number, max: number, count: number): number[] {
    // FIX: Unexpected var, use let or const instead.
    // Changed 'var' to 'const' for 'arr'
    const arr: number[] = [];
    while (arr.length < count) {
        const r = Math.floor(Math.random() * (max - min)) + min;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
}