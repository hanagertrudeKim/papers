"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/locations";

type LandPatch = {
  lat: number;
  lng: number;
  latRadius: number;
  lngRadius: number;
  density: number;
};

const LAND_PATCHES: LandPatch[] = [
  // North America
  { lat: 48, lng: -105, latRadius: 26, lngRadius: 46, density: 420 },
  { lat: 37, lng: -88, latRadius: 18, lngRadius: 34, density: 260 },
  { lat: 16, lng: -90, latRadius: 9, lngRadius: 18, density: 90 },
  // South America
  { lat: -13, lng: -60, latRadius: 32, lngRadius: 18, density: 300 },
  { lat: -38, lng: -67, latRadius: 18, lngRadius: 10, density: 120 },
  // Europe / Africa
  { lat: 50, lng: 12, latRadius: 12, lngRadius: 25, density: 190 },
  { lat: 8, lng: 20, latRadius: 34, lngRadius: 25, density: 430 },
  { lat: -24, lng: 24, latRadius: 20, lngRadius: 17, density: 160 },
  // Asia
  { lat: 46, lng: 78, latRadius: 24, lngRadius: 58, density: 520 },
  { lat: 26, lng: 86, latRadius: 15, lngRadius: 33, density: 220 },
  { lat: 14, lng: 105, latRadius: 12, lngRadius: 22, density: 120 },
  // Australia / islands
  { lat: -25, lng: 135, latRadius: 14, lngRadius: 22, density: 120 },
  { lat: -5, lng: 122, latRadius: 10, lngRadius: 24, density: 90 },
  // Greenland
  { lat: 72, lng: -42, latRadius: 11, lngRadius: 18, density: 80 },
];

function seededNoise(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function LandLayer() {
  const landPositions = useMemo(() => {
    const positions: number[] = [];
    let seed = 1;

    LAND_PATCHES.forEach((patch) => {
      for (let i = 0; i < patch.density; i++) {
        const angle = seededNoise(seed++) * Math.PI * 2;
        const radius = Math.sqrt(seededNoise(seed++));
        const wobble = 0.82 + seededNoise(seed++) * 0.28;
        const lat = patch.lat + Math.sin(angle) * patch.latRadius * radius * wobble;
        const lng = patch.lng + Math.cos(angle) * patch.lngRadius * radius * wobble;

        if (lat > 84 || lat < -58) continue;
        const p = latLngToVector3(lat, lng, 2.026);
        positions.push(p.x, p.y, p.z);
      }
    });

    return new Float32Array(positions);
  }, []);

  const coastPositions = useMemo(() => {
    const positions: number[] = [];

    LAND_PATCHES.forEach((patch, patchIndex) => {
      for (let i = 0; i <= 80; i++) {
        const t = (i / 80) * Math.PI * 2;
        const ripple =
          1 +
          Math.sin(t * 3 + patchIndex) * 0.08 +
          Math.sin(t * 7 + patchIndex * 0.7) * 0.045;
        const lat = patch.lat + Math.sin(t) * patch.latRadius * ripple;
        const lng = patch.lng + Math.cos(t) * patch.lngRadius * ripple;
        const p = latLngToVector3(lat, lng, 2.032);
        positions.push(p.x, p.y, p.z);
      }
    });

    return new Float32Array(positions);
  }, []);

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[landPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#7DD3FC"
          size={0.025}
          transparent
          opacity={0.46}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[coastPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#BAE6FD" transparent opacity={0.16} />
      </lineSegments>
    </group>
  );
}
