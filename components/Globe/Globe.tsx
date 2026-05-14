"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LocationPin from "./LocationPin";
import ConnectionArc from "./ConnectionArc";
import LandLayer from "./LandLayer";
import { latLngToVector3, LOCATIONS, LocationKey } from "@/lib/locations";

interface GlobeProps {
  onPinClick?: (location: LocationKey) => void;
}

export default function Globe({ onPinClick }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  const stars = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 140; i++) {
      const angle = i * 2.399963;
      const y = 1 - (i / 139) * 2;
      const radius = Math.sqrt(1 - y * y);
      const distance = 3.2 + (i % 7) * 0.06;
      positions.push(
        Math.cos(angle) * radius * distance,
        y * distance,
        Math.sin(angle) * radius * distance
      );
    }
    return new Float32Array(positions);
  }, []);

  const cityLights = useMemo(() => {
    const coords = [
      [37.5665, 126.978], [18.5944, -72.3074], [42.3601, -71.0589],
      [35.6762, 139.6503], [1.3521, 103.8198], [51.5072, -0.1276],
      [48.8566, 2.3522], [40.7128, -74.006], [19.4326, -99.1332],
      [-23.5505, -46.6333], [-33.8688, 151.2093], [28.6139, 77.209],
      [14.5995, 120.9842], [-1.2921, 36.8219], [30.0444, 31.2357],
      [25.2048, 55.2708], [52.52, 13.405], [43.6532, -79.3832],
      [34.0522, -118.2437], [41.9028, 12.4964], [31.2304, 121.4737],
    ];
    const positions: number[] = [];
    coords.forEach(([lat, lng], i) => {
      const p = latLngToVector3(lat, lng, 2.028 + (i % 3) * 0.002);
      positions.push(p.x, p.y, p.z);
    });
    return new Float32Array(positions);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current && !isHovered) {
      groupRef.current.rotation.y += delta * 0.08;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z += delta * 0.035;
      orbitRef.current.rotation.y -= delta * 0.018;
    }
  });

  return (
    <group>
      {/* Distant mission-map stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#bfdbfe" size={0.01} transparent opacity={0.25} />
      </points>

      {/* Slow orbit rings — gives the globe a navigational / global-network feel */}
      <group ref={orbitRef}>
        <mesh rotation={[Math.PI / 2.6, 0, Math.PI / 5]}>
          <torusGeometry args={[2.43, 0.0025, 8, 192]} />
          <meshBasicMaterial color="#93c5fd" transparent opacity={0.16} />
        </mesh>
        <mesh rotation={[Math.PI / 2.1, Math.PI / 6, -Math.PI / 7]}>
          <torusGeometry args={[2.69, 0.002, 8, 192]} />
          <meshBasicMaterial color="#FF6B6B" transparent opacity={0.11} />
        </mesh>
        <mesh rotation={[Math.PI / 2.35, -Math.PI / 5, Math.PI / 3]}>
          <torusGeometry args={[2.94, 0.002, 8, 192]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.1} />
        </mesh>
      </group>

      <group ref={groupRef}>
      {/* Atmosphere glow */}
      <mesh scale={1.12}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh scale={1.03}>
        <sphereGeometry args={[2, 96, 96]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Globe body */}
      <mesh
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <sphereGeometry args={[2, 96, 96]} />
        <meshStandardMaterial
          color="#123B73"
          emissive="#0A2A52"
          emissiveIntensity={0.56}
          roughness={0.62}
          metalness={0.04}
        />
      </mesh>

      {/* Soft night-side terminator */}
      <mesh rotation={[0.18, -0.55, 0.05]} scale={[1.002, 1.002, 1.002]}>
        <sphereGeometry args={[2.003, 96, 96]} />
        <meshBasicMaterial color="#031427" transparent opacity={0.08} side={THREE.FrontSide} />
      </mesh>

      {/* Fine latitude / longitude grid */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[2.012, 32, 16]} />
        <meshBasicMaterial color="#BAE6FD" transparent opacity={0.038} wireframe />
      </mesh>

      {/* Soft daylight wash so the globe does not disappear into the hero */}
      <mesh scale={[1.006, 1.006, 1.006]} rotation={[0.1, 0.25, 0]}>
        <sphereGeometry args={[2.005, 96, 96]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.045} side={THREE.FrontSide} />
      </mesh>

      {/* Abstract continent layer — enough geography to read as Earth without a heavy texture */}
      <LandLayer />

      {/* City / project context lights */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cityLights, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e0f2fe" size={0.035} transparent opacity={0.68} />
      </points>

      {/* Route arcs — the portfolio story as a route map */}
      <ConnectionArc
        from={LOCATIONS.korea}
        to={LOCATIONS.haiti}
        color="#FF6B6B"
        delay={0}
        height={0.88}
      />
      <ConnectionArc
        from={LOCATIONS.haiti}
        to={LOCATIONS.usa}
        color="#10B981"
        delay={0.34}
        height={0.58}
      />
      <ConnectionArc
        from={LOCATIONS.korea}
        to={LOCATIONS.usa}
        color="#3B82F6"
        delay={0.68}
        height={0.72}
      />

      {/* Location pins */}
      {(Object.entries(LOCATIONS) as [LocationKey, (typeof LOCATIONS)[LocationKey]][]).map(
        ([key, loc]) => (
          <LocationPin
            key={key}
            lat={loc.lat}
            lng={loc.lng}
            color={loc.color}
            label={loc.label}
            detail={loc.detail}
            onClick={() => onPinClick?.(key)}
          />
        )
      )}
      </group>
    </group>
  );
}
