'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

export interface HyperspeedOptions {
  onSpeedUp?: () => void;
  onSlowDown?: () => void;
  distortion?: 'turbulentDistortion' | 'mountainDistortion' | 'xyDistortion' | 'LongRaceDistortion' | 'deepDistortion' | 'none';
  length?: number;
  roadWidth?: number;
  islandWidth?: number;
  lanesPerRoad?: number;
  fov?: number;
  fovSpeedUp?: number;
  speedUp?: number;
  carLightsFade?: number;
  totalSideLightSticks?: number;
  lightPairsPerRoadWay?: number;
  shoulderLinesWidthPercentage?: number;
  brokenLinesWidthPercentage?: number;
  brokenLinesLengthPercentage?: number;
  lightStickWidth?: [number, number];
  lightStickHeight?: [number, number];
  movingAwaySpeed?: [number, number];
  movingCloserSpeed?: [number, number];
  carLightsLength?: [number, number];
  carLightsRadius?: [number, number];
  carWidthPercentage?: [number, number];
  carShiftX?: [number, number];
  carFloorSeparation?: [number, number];
  colors?: {
    roadColor: number;
    islandColor: number;
    background: number;
    shoulderLines: number;
    brokenLines: number;
    leftCars: number[];
    rightCars: number[];
    sticks: number;
  };
}

export interface HyperspeedProps {
  effectOptions?: HyperspeedOptions;
  className?: string;
}

const DEFAULT_OPTIONS: HyperspeedOptions = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x060818,
    shoulderLines: 0xFFFFFF,
    brokenLines: 0xFFFFFF,
    leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
    rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
    sticks: 0x03B3C3,
  },
};

export const Hyperspeed = forwardRef<HTMLDivElement, HyperspeedProps>(
  ({ effectOptions, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    useEffect(() => {
      if (!containerRef.current || !canvasRef.current) return;

      const options = { ...DEFAULT_OPTIONS, ...effectOptions };
      const colors = { ...DEFAULT_OPTIONS.colors!, ...effectOptions?.colors };

      const state = {
        speed: 1,
        targetSpeed: 1,
        fov: options.fov!,
        targetFov: options.fov!,
      };

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(colors.background);

      const camera = new THREE.PerspectiveCamera(state.fov, 1, 0.1, 10000);
      camera.position.z = 10;
      camera.position.y = 7;

      const resize = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener('resize', resize);
      resize();

      // Build the warp tunnel geometry
      const count = 2500;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3 * 2);
      const lineColors = new Float32Array(count * 3 * 2);

      for (let i = 0; i < count; i++) {
        const z = Math.random() * options.length!;
        const r = options.roadWidth! + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;

        const x = Math.cos(theta) * r;
        const y = Math.sin(theta) * r;

        const idx = i * 6;
        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = -z;

        positions[idx + 3] = x;
        positions[idx + 4] = y;
        positions[idx + 5] = -(z + 10 + Math.random() * 50);

        const colorSet =
          i % 2 === 0 ? colors.leftCars! : colors.rightCars!;
        const chosenColor = new THREE.Color(
          colorSet[Math.floor(Math.random() * colorSet.length)]
        );

        lineColors[idx] = chosenColor.r;
        lineColors[idx + 1] = chosenColor.g;
        lineColors[idx + 2] = chosenColor.b;

        lineColors[idx + 3] = chosenColor.r;
        lineColors[idx + 4] = chosenColor.g;
        lineColors[idx + 5] = chosenColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });

      const lines = new THREE.LineSegments(geometry, material);
      scene.add(lines);

      // Animation loop
      let animationId: number;
      const animate = (time: number) => {
        animationId = requestAnimationFrame(animate);

        state.speed += (state.targetSpeed - state.speed) * 0.05;
        state.fov += (state.targetFov - state.fov) * 0.05;
        camera.fov = state.fov;
        camera.updateProjectionMatrix();

        const pos = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
          const idx = i * 6;
          pos[idx + 2] += state.speed * 5;
          pos[idx + 5] += state.speed * 5;

          if (pos[idx + 2] > 50) {
            const newZ = options.length!;
            const length = 10 + Math.random() * 50;
            pos[idx + 2] = -newZ;
            pos[idx + 5] = -(newZ + length);
          }

          // Distortion modes
          if (options.distortion === 'turbulentDistortion') {
            const offset =
              Math.sin(time * 0.001 + pos[idx + 2] * 0.01) * 2;
            pos[idx] += offset * 0.01;
            pos[idx + 3] += offset * 0.01;
          } else if (options.distortion === 'mountainDistortion') {
            const offset = Math.cos(pos[idx + 2] * 0.005) * 5;
            pos[idx + 1] += offset * 0.01;
            pos[idx + 4] += offset * 0.01;
          } else if (options.distortion === 'xyDistortion') {
            const ox = Math.sin(time * 0.0007 + pos[idx + 2] * 0.008) * 1.5;
            const oy = Math.cos(time * 0.0009 + pos[idx + 2] * 0.006) * 1.5;
            pos[idx] += ox * 0.01;
            pos[idx + 1] += oy * 0.01;
            pos[idx + 3] += ox * 0.01;
            pos[idx + 4] += oy * 0.01;
          } else if (options.distortion === 'deepDistortion') {
            const wave =
              Math.sin(time * 0.0005 + pos[idx + 2] * 0.003) * 3;
            pos[idx] += wave * 0.008;
            pos[idx + 1] += wave * 0.008;
            pos[idx + 3] += wave * 0.008;
            pos[idx + 4] += wave * 0.008;
          }
        }
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };

      animate(0);

      // Speed-up interaction
      const handleSpeedUp = () => {
        state.targetSpeed = options.speedUp!;
        state.targetFov = options.fovSpeedUp!;
        options.onSpeedUp?.();
      };
      const handleSlowDown = () => {
        state.targetSpeed = 1;
        state.targetFov = options.fov!;
        options.onSlowDown?.();
      };

      window.addEventListener('mousedown', handleSpeedUp);
      window.addEventListener('mouseup', handleSlowDown);
      window.addEventListener('touchstart', handleSpeedUp);
      window.addEventListener('touchend', handleSlowDown);

      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousedown', handleSpeedUp);
        window.removeEventListener('mouseup', handleSlowDown);
        window.removeEventListener('touchstart', handleSpeedUp);
        window.removeEventListener('touchend', handleSlowDown);
        cancelAnimationFrame(animationId);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }, [effectOptions]);

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden ${className || ''}`}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    );
  }
);

Hyperspeed.displayName = 'Hyperspeed';

export default Hyperspeed;

// Teyro-themed preset — purple/indigo palette matching the brand
export const teyroHyperspeedPreset: HyperspeedOptions = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2.5,
  colors: {
    roadColor: 0x060818,
    islandColor: 0x060818,
    background: 0x060818,
    shoulderLines: 0x1a1a2e,
    brokenLines: 0x1a1a2e,
    leftCars: [0x6352FF, 0x9333EA, 0xC084FC],
    rightCars: [0xA78BFA, 0x7C3AED, 0x818CF8],
    sticks: 0x6352FF,
  },
};
