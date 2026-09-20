"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Fixed WebGL particle depth field behind the whole page — the "space" in
 * shiva.os. The camera leans toward the pointer and dollies gently with
 * scroll, so the site feels like panels floating in a volume rather than a
 * flat document. Falls back to a static gradient under reduced motion or
 * when WebGL is unavailable.
 */

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  attribute float aScale;
  attribute float aColorMix;
  attribute float aPhase;
  varying float vColorMix;
  varying float vDepthFade;

  void main() {
    vec3 pos = position;
    // Slow individual drift so the field feels alive, never mechanical.
    pos.x += sin(uTime * 0.12 + aPhase) * 0.6;
    pos.y += cos(uTime * 0.09 + aPhase * 1.7) * 0.6;
    // Scroll parallax: deeper particles move less (z is negative into scene).
    pos.y += uScroll * (10.0 / (1.0 + abs(pos.z) * 0.15));

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * (52.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vColorMix = aColorMix;
    vDepthFade = clamp(1.0 - (-mvPosition.z - 8.0) / 55.0, 0.15, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vColorMix;
  varying float vDepthFade;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float strength = smoothstep(0.5, 0.05, d);

    // photon cyan -> aurora violet -> near-white starlight
    vec3 photon = vec3(0.45, 0.85, 1.0);
    vec3 aurora = vec3(0.72, 0.5, 1.0);
    vec3 star = vec3(0.92, 0.95, 1.0);
    vec3 color = vColorMix < 0.5
      ? mix(photon, aurora, vColorMix * 2.0)
      : mix(aurora, star, (vColorMix - 0.5) * 2.0);

    gl_FragColor = vec4(color, strength * vDepthFade * 0.55);
  }
`;

/** Deterministic PRNG (mulberry32) — keeps particle generation pure across renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField({ count }: { count: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const { positions, scales, colorMixes, phases } = useMemo(() => {
    const rand = mulberry32(1504);
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colorMixes = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 60;
      positions[i * 3 + 1] = (rand() - 0.5) * 40;
      positions[i * 3 + 2] = -6 - rand() * 50;
      scales[i] = 0.8 + rand() * 1.9;
      colorMixes[i] = rand();
      phases[i] = rand() * Math.PI * 2;
    }
    return { positions, scales, colorMixes, phases };
  }, [count]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uScroll.value = THREE.MathUtils.damp(
        material.uniforms.uScroll.value,
        scroll.current,
        3,
        delta
      );
    }
    // Camera leans toward the pointer — the signature spatial feel.
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, pointer.current.x * 2.2, 2.5, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, pointer.current.y * 1.4, 2.5, delta);
    cam.lookAt(0, 0, -20);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aColorMix" args={[colorMixes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={{ uTime: { value: 0 }, uScroll: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function StaticFallback() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.22 0.06 265 / 60%), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 100%, oklch(0.2 0.07 295 / 40%), transparent 60%)",
      }}
    />
  );
}

function detectEnvironment(): { mode: "webgl" | "static"; particleCount: number } {
  if (typeof window === "undefined") return { mode: "static", particleCount: 0 };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let webglOk = false;
  try {
    const canvas = document.createElement("canvas");
    webglOk = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webglOk = false;
  }
  return {
    mode: reduced || !webglOk ? "static" : "webgl",
    particleCount: window.innerWidth < 768 ? 1100 : 2400,
  };
}

export function SpaceCanvas() {
  // Component is loaded with ssr:false, so the environment is readable at first render.
  const [{ mode, particleCount }] = useState(detectEnvironment);

  if (mode !== "webgl") return <StaticFallback />;

  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <StaticFallback />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ParticleField count={particleCount} />
      </Canvas>
    </div>
  );
}
